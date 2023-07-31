import { Component, OnInit } from '@angular/core';
import { TodoListFacade } from '../../store/todo-list.facade';
import { Todos } from '../../store/todo-list.model';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  dateControl = new FormControl();
  searchControl = new FormControl();
  minDate: Date | undefined;
  form!: FormGroup;
  noResultsMessage = false;

  todoList$ = this.todosFacade.todos$;
  loading$ = this.todosFacade.loading$;
  filteredTodos$ = this.todoList$.pipe(
    startWith([]),
  );

  constructor(
    private todosFacade: TodoListFacade,
    private formBuilder: FormBuilder
  ) {
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: [''],
      date: [''],
      search: ['']
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      untilDestroyed(this)
    ).subscribe(searchTerm => {
      this.filterTodos(searchTerm);
    });
  }

  onCreateTodo(title: string, description: string, date: string) {
    const todo: Todos = {
      id: this.generateUniqueId(),
      title,
      description,
      date,
      isCompleted: false,
    };
    this.todosFacade.addTodo(todo);
    this.form.reset()
  }

  onTodoStatusChanged(id: string, isCompleted: boolean) {
    this.todosFacade.updateTodoStatus(id, isCompleted);
  }

  onDelete(id: string) {
    this.todosFacade.deleteTodo(id);
  }

  onLogout(): void {
    this.todosFacade.logout();
  }

  filterTodos(searchTerm: string) {
    this.filteredTodos$ = this.todoList$.pipe(
      map(todos => {
        if (!searchTerm) {
          return todos;
        } else {
          const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));
          this.noResultsMessage = filteredTodos.length === 0;
          return filteredTodos;
        }
      }),
    );
  }

  onFilterChange(filter: string) {
    switch (filter) {
      case 'all':
        this.filteredTodos$ = this.todosFacade.todos$;
        break;
      case 'active':
        this.filteredTodos$ = this.todosFacade.todos$.pipe(
          map((todos) => todos.filter((todo) => !todo.isCompleted)),
        );
        break;
      case 'done':
        this.filteredTodos$ = this.todosFacade.todos$.pipe(
          map((todos) => todos.filter((todo) => todo.isCompleted)),
        );
        break;
      default:
        this.filteredTodos$ = this.todosFacade.todos$;
        break;
    }
  }

  generateUniqueId(): string {
    const timestamp = new Date().getTime().toString(16);
    const randomNum = Math.random().toString(16).substring(2);
    return timestamp + randomNum;
  }
}
