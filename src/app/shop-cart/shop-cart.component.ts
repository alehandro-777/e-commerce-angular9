import { Component, OnInit } from '@angular/core';
import {ShopCart, ShopCartLine} from './shop-cart.model'
import {ShopCartService} from './shop-cart.service'
import {AuthenticationService} from '../login/authentication.service'

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  cart : ShopCart;

  constructor(
    private _http: ShopCartService,
    private _authService : AuthenticationService,
  ) { }

  ngOnInit() {
    const cart_id = this._authService.userValue.shopcart;
    this._http.getCartById(cart_id).subscribe(
      card =>{
        this.cart = card;
    }
    )
  }
  
  addOneProduct(event, product_id){
    this._http.addProduct(this.cart._id, product_id).subscribe(cart=>
      {
        this.cart = cart;
      })
  }

  removeCardLine(event, line_id){
    this._http.removeCardLine(this.cart._id, line_id).subscribe(cart=>
      {
        this.cart = cart;
      })
  }
  
}
