import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoListService } from './todo-list.service';
import * as TodosActions from './todo-list.actions';
import { of } from 'rxjs';

@Injectable()
export class TodoListEffects {
    loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      mergeMap(() =>
        this.todoListService.fetchTodos().pipe(
          map((todos) => TodosActions.loadTodosSuccess({ todos })),
          catchError((error) =>
            of(TodosActions.loadTodosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addTodo),
      mergeMap(({ todo }) =>
        this.todoListService.addTodo(todo).pipe(
          map((addedTodo) => TodosActions.addTodoSuccess({ todo: addedTodo })),
          catchError((error) =>
            of(TodosActions.addTodoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateTodo),
      mergeMap(({ id, isCompleted }) =>
        this.todoListService.updateTodoStatus(id, isCompleted).pipe(
          map((updatedTodo) =>
            TodosActions.updateTodoSuccess({ todo: updatedTodo })
          ),
          catchError((error) =>
            of(TodosActions.updateTodoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.deleteTodo),
      mergeMap(({ id }) =>
        this.todoListService.deleteTodo(id).pipe(
          map(() => TodosActions.deleteTodoSuccess({ id })),
          catchError((error) =>
            of(TodosActions.deleteTodoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private todoListService: TodoListService
  ) {}
}