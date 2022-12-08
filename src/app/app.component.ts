import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TODO } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todos';

  todos: TODO[] = [];

  newTodoForm = this.formBuilder.group({
    content: '',
  });

  constructor(private service: TodoService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getTodos();
    this.newTodoForm.controls["content"].addValidators([Validators.minLength(1), Validators.maxLength(254)]);
  }

  getTodos() {
    this.service.getTodos().subscribe((response) => {
      this.todos = response;
    });
  }

  postTodo() {
    var content = this.newTodoForm.value.content;

    if (!content) {
      return;
    }

    if (!this.newTodoForm.valid) {
      return;
    }

    this.service.postTodo(content).subscribe((response) => {
      this.todos.unshift(response);
    });

    this.newTodoForm.reset();
  }

  deleteTodo(id: string) {
    this.service.deleteTodo(id).subscribe(response => {
      var indexOfTodoToDelete = this.todos.map(obj => obj.id).indexOf(response.id);
      this.todos.splice(indexOfTodoToDelete, 1);
    });
  }

  markCompleted(id: string) {
    var indexOfTodo = this.todos.map(obj => obj.id).indexOf(id);
    var todo = this.todos[indexOfTodo];

    todo.completed = true;

    this.service.putTodo(todo).subscribe(response => {
      this.todos[indexOfTodo] = response;
    });
  }

  unmarkCompleted(id: string) {
    var indexOfTodo = this.todos.map(obj => obj.id).indexOf(id);
    var todo = this.todos[indexOfTodo];

    todo.completed = false;

    this.service.putTodo(todo).subscribe(response => {
      this.todos[indexOfTodo] = response;
    });
  }

  saveContent(id: string, content: string) {
    var indexOfTodo = this.todos.map(obj => obj.id).indexOf(id);
    var todo = this.todos[indexOfTodo];
    
    todo.content = content;

    // this.todos[indexOfTodo] = todo;

    this.service.putTodo(todo).subscribe(response => {
      this.todos[indexOfTodo] = response;
    });
  }

  convertDate(epochTime: number): Date {
    return new Date(epochTime);
  }

}
