import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-app/components/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', component: TodoListComponent, pathMatch: 'full' },
  { path: ':filter', component: TodoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
