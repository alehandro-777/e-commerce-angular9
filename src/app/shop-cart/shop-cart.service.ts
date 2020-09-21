import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment'
import {ShopCart} from './shop-cart.model'
import { from, Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  constructor(    
    private http: HttpClient

  ) { }

  getCartById(id : string) : Observable<ShopCart> {
    return this.http.get<any>(`${environment.apiUrl}/shopcarts/${id}`);
  }  

  addProduct(id:string, product_id:string) : Observable<ShopCart> {
    return this.http.post<any>(`${environment.apiUrl}/shopcarts/${id}/lines`, {product_id:product_id});
  } 
  
  removeCardLine(id:string, line_id:string) : Observable<ShopCart> {
    return this.http.delete<any>(`${environment.apiUrl}/shopcarts/${id}/lines/${line_id}`);
  }
  
}
