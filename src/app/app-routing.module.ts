import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ShopCartComponent} from './shop-cart/shop-cart.component';
import {HomeComponent} from './home/home.component';
import {TableComponent} from './tables/table.component';
import {LoginComponent} from './login/login.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form/dynamic-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'table', component: TableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: DynamicFormComponent },
  { path: 'shopcart', component: ShopCartComponent },
  { path: '**', component: HomeComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
