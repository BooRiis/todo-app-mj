import { createAction, props } from '@ngrx/store';
import { Todos } from './todo-list.model';

export const loadTodos = createAction('[Todos] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{ todos: Todos[] }>()
);

export const loadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{ error: string }>()
);

export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ todo: Todos }>()
);

export const addTodoSuccess = createAction(
  '[Todos] Add Todo Success',
  props<{ todo: Todos }>()
);

export const addTodoFailure = createAction(
  '[Todos] Add Todo Failure',
  props<{ error: string }>()
);

export const updateTodo = createAction(
  '[Todos] Update Todo',
  props<{ id: string; isCompleted: boolean }>()
);

export const updateTodoSuccess = createAction(
  '[Todos] Update Todo Success',
  props<{ todo: Todos }>()
);

export const updateTodoFailure = createAction(
  '[Todos] Update Todo Failure',
  props<{ error: string }>()
);

// Delete Todo
export const deleteTodo = createAction(
  '[Todos] Delete Todo',
  props<{ id: string }>()
);

export const deleteTodoSuccess = createAction(
  '[Todos] Delete Todo Success',
  props<{ id: string }>()
);

export const deleteTodoFailure = createAction(
  '[Todos] Delete Todo Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
