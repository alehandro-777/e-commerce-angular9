import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product, ProductCategory, ProductsPage, ProductsCategoryPage } from './catalog.model'
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})

export class CatalogService {
  constructor(
    private http: HttpClient
    ) { 

    }


  getProductsCatalog() : Observable<ProductsCategoryPage> { 
    const page = new ProductsCategoryPage();

    const cat_array = Array.from({ length: 10 }, (v, k) => {
      const new_cat = new ProductCategory();
      new_cat.description = `Category description description ${k}`;
      new_cat.name = `category${k}`;
      return new_cat;
    });
    page.data = cat_array;

    return from([page]);
  }

  getProductsPage(sort: string, order: string, page: number) : Observable<ProductsPage> { 
    const prod_page = new ProductsPage();
    prod_page.total_count = 100;

    prod_page.data = Array.from({ length: 9 }, (v, k) => {

      const product = new Product();
      product.image_uri = `${environment.apiUrl}/images/1.jpg`
      product.description = 'Product description description description description description${k}'
      product.category = `category${k}`;
      product.price = (k+1)*1000;

      return product;
    });

    return from([prod_page]);
  }

}
