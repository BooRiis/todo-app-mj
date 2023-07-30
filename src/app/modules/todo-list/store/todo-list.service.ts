import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todos } from './todo-list.model';

@Injectable()
export class TodoListService {
  private readonly apiUrl = 'https://64c56817c853c26efadad1fb.mockapi.io';

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todos[]> {
    return this.http.get<Todos[]>(`${this.apiUrl}/api/todos/todoList`);
  }

  addTodo(todo: Todos): Observable<Todos> {
    return this.http.post<Todos>(`${this.apiUrl}/api/todos/todoList`, todo);
  }

  updateTodoStatus(id: string, isCompleted: boolean): Observable<Todos> {
    return this.http.put<Todos>(`${this.apiUrl}/api/todos/todoList/${id}`, {isCompleted});
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/todos/todoList/${id}`);
  }
}