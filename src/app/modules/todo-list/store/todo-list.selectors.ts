import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todo-list.model';
import { TODO_LIST } from './todo-list.reducer';


export const selectTodosState = createFeatureSelector<TodosState>(TODO_LIST);


export const selectTodos = createSelector(
  selectTodosState,
  (state: TodosState) => state.todos
);

export const selectTodosLoading = createSelector(
  selectTodosState,
  (state: TodosState) => state.loading
);


export const selectTodosError = createSelector(
  selectTodosState,
  (state: TodosState) => state.error
);