import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { from, Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product, ProductCategory, ProductsCategoryPage } from '../../home/catalog.model'
import {environment} from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ProdCatService {

  constructor(
    private http: HttpClient,

  ) { }

  createCategory(new_model : ProductCategory) : Observable<ProductCategory> {
    return this.http.post<any>(`${environment.apiUrl}/categories`, new_model);
  } 

  updateCategory(new_model : ProductCategory) : Observable<ProductCategory> {
    const id = new_model._id;
    return this.http.patch<any>(`${environment.apiUrl}/categories/${id}`, new_model);
  }  

  getCategoryById(id : string) : Observable<ProductCategory> {
    return this.http.get<any>(`${environment.apiUrl}/categories/${id}`);
  }  
  
  deleteCategory(id : string) : Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/categories/${id}`);
  }  

  getCategoiesPage(page_index: number =0, per_page:number=10) : Observable<ProductsCategoryPage> { 
    return this.http.get<any>(`${environment.apiUrl}/categories?page=${page_index+1}&per_page=${per_page}`);
  }

}
