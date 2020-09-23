import { Component, OnInit } from '@angular/core';
import {FormService} from './forms/form.service'
import {AuthenticationService} from './login/authentication.service'
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from './admin/user/user.model'
import {ShopCartService} from './shop-cart/shop-cart.service'
import {ShopCart} from './shop-cart/shop-cart.model'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user$ : Observable<User>;
  cart$ : Observable<ShopCart>;

  constructor(
    private _cartService : ShopCartService,
    private _authService : AuthenticationService,
    private _formService : FormService,
    private route: ActivatedRoute,
    private router: Router, 
    ) {}

  ngOnInit() {
    this.user$ = this._authService.user;
    this.cart$ = this._cartService.cart;
  }

  openDialogForm(){
    this._formService.openDialog('form_id');
  }

  logout(){
    this._authService.logout(); 
  }

  onShopCartClick() {
    const cart_id = this._authService.userValue.shopcart;
    this.router.navigate([`/shopcart/${cart_id}`]);
  }
}

