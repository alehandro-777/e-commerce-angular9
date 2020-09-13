import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TableComponent} from './tables/table.component';
import {LoginComponent} from './login/login.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form/dynamic-form.component';

const routes: Routes = [
  {path: 'table', component: TableComponent },
  {path: 'login', component: LoginComponent },
  {path: 'form', component: DynamicFormComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
