import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TODO } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url = 'http://localhost:8080/';

  constructor(private httpClient : HttpClient) { }

  getTodos(): Observable<TODO[]> {
    return this.httpClient.get<TODO[]>(this.url + 'todos');
  }

  postTodo(content: string): Observable<TODO> {
    return this.httpClient.post<TODO>(this.url + 'todo', {content: content});
  }

  deleteTodo(id: string): Observable<TODO> {
    return this.httpClient.delete<TODO>(this.url + 'todo/' + id);
  }

  putTodo(todo: TODO): Observable<TODO> {
    return this.httpClient.put<TODO>(this.url + 'todo', todo);
  }

}
