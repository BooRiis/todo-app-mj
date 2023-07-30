import { Component } from '@angular/core';
import { TodoListFacade } from '../../store/todo-list.facade';
import { Todos } from '../../store/todo-list.model';
import { map } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  dateControl = new FormControl();
  minDate: Date | undefined;
  todoList$ = this.todosFacade.todos$;
  loading$ = this.todosFacade.loading$;

  constructor(private todosFacade: TodoListFacade) {
    this.minDate = new Date();
  
    this.minDate.setHours(0, 0, 0, 0);
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
  }

  onTodoStatusChanged(id: string, isCompleted: boolean) {
    this.todosFacade.updateTodoStatus(id, isCompleted);
  }

  onDelete(id: string) {
    this.todosFacade.deleteTodo(id);
  }

  onFilterChange(filter: string) {
    switch (filter) {
      case 'all':
        this.todoList$ = this.todosFacade.todos$;
        break;
      case 'active':
        this.todoList$ = this.todosFacade.todos$.pipe(
          map((todos) => todos.filter((todo) => !todo.isCompleted))
        );
        break;
      case 'done':
        this.todoList$ = this.todosFacade.todos$.pipe(
          map((todos) => todos.filter((todo) => todo.isCompleted))
        );
        break;
      default:
        this.todoList$ = this.todosFacade.todos$;
        break;
    }
  }

  generateUniqueId(): string {
    const timestamp = new Date().getTime().toString(16);
    const randomNum = Math.random().toString(16).substr(2);
    return timestamp + randomNum;
  }
}
