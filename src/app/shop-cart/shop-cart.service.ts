import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment'
import {ShopCart} from './shop-cart.model'
import { from, Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  private cartSubject: BehaviorSubject<ShopCart>;
  public cart: Observable<ShopCart>;

  constructor(    
    private http: HttpClient

  ) { 
    this.cartSubject = new BehaviorSubject<ShopCart>(new ShopCart());
    this.cart = this.cartSubject.asObservable();

  }

  getCartById(id : string) : Observable<ShopCart> {
    return this.http.get<any>(`${environment.apiUrl}/shopcarts/${id}`).pipe(
      map(cart=>{
        this.cartSubject.next(cart);
        return cart;
      }));
  }  

  addProduct(id:string, product_id:string) : Observable<ShopCart> {
    return this.http.post<any>(`${environment.apiUrl}/shopcarts/${id}/lines`, {product_id:product_id}).pipe(
      map(cart=>{
        this.cartSubject.next(cart);
        return cart;
      }));
  } 
  
  removeCardLine(id:string, line_id:string) : Observable<ShopCart> {
    return this.http.delete<any>(`${environment.apiUrl}/shopcarts/${id}/lines/${line_id}`).pipe(
      map(cart=>{
        this.cartSubject.next(cart);
        return cart;
      }));
  }
  
}
