import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todos } from '../../store/todo-list.model';
import { TodoListFacade } from '../../store/todo-list.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent {
  @Input() todos: Todos[] | undefined | null;
  @Output() deleteTodo: EventEmitter<string> = new EventEmitter<string>();
  @Output() todoStatusChanged: EventEmitter<{id: string, isCompleted: boolean}> = new EventEmitter<{id: string, isCompleted: boolean}>();

  constructor(private todosFacade: TodoListFacade) {}

  ngOnInit() {

    this.todosFacade.loadTodos();
  }

  onTodoStatusChanged(id: string, isCompleted: boolean) {
    this.todoStatusChanged.emit({id, isCompleted});
  }

  onDelete(id: string) {
    this.deleteTodo.emit(id);
  }
}
