import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ShopCartComponent} from './shop-cart/shop-cart.component';
import {HomeComponent} from './home/home.component';
import {TableComponent} from './tables/table.component';
import {LoginComponent} from './login/login.component';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form/dynamic-form.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import {EditUserComponent} from './admin/user/edit-user/edit-user/edit-user.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'table', component: TableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: DynamicFormComponent },
  { path: 'shopcart', component: ShopCartComponent },
  { path: 'editprod', component: EditProductComponent },
  { path: 'edituser', component: EditUserComponent },
  { path: '**', component: HomeComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
