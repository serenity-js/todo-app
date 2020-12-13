import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NewTodoInputComponent } from './components/new-todo-input/new-todo-input.component';
import { ToggleAllButtonComponent } from './components/toggle-all-button/toggle-all-button.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { TodoLocalStorageService } from './services/todo-local-storage.service';
import { TodoRestStorageService } from './services/todo-rest-storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoStorageService } from './services/todo-storage.service';
import { todoStorageServiceFactory } from './services/todo-storage-service.factory';
import { AppConfigService } from '../app-config.service';

@NgModule({
  declarations: [
    TodoListComponent,
    NewTodoInputComponent,
    ToggleAllButtonComponent,
    TodoItemComponent,
    ToolboxComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: TodoStorageService,
      useFactory: todoStorageServiceFactory,
      deps: [ AppConfigService, HttpClient ]
    }
  ],
})
export class TodoAppModule { }
