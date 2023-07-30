import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as TodosActions from './todo-list.actions';
import { Todos, TodosState } from './todo-list.model'; // Assuming you have a root reducer named app.reducer.ts
import {
    selectTodos,
    selectTodosError,
    selectTodosLoading,
} from './todo-list.selectors';

@Injectable()
export class TodoListFacade {
  todos$ = this.store.pipe(select(selectTodos));
  loading$ = this.store.pipe(select(selectTodosLoading));
  error$ = this.store.pipe(select(selectTodosError));

  constructor(private readonly store: Store<TodosState>) {}

  loadTodos() {
    this.store.dispatch(TodosActions.loadTodos());
  }

  addTodo(todo: Todos) {
    this.store.dispatch(TodosActions.addTodo({ todo }));
  }

  updateTodoStatus(id: string, isCompleted: boolean) {
    this.store.dispatch(TodosActions.updateTodo({ id, isCompleted }));
  }

  deleteTodo(id: string) {
    this.store.dispatch(TodosActions.deleteTodo({ id }));
  }
}