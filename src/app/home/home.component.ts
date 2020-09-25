import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from './catalog.service'
import { Product, ProductCategory, ProductsPage, ProductsCategoryPage } from './catalog.model'
import {MatPaginator} from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {from , merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {environment} from 'src/environments/environment'
import {MatSelectionList} from '@angular/material/list';
import {ShopCartService} from '../shop-cart/shop-cart.service'
import {AuthenticationService} from '../login/authentication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  default_page_size = 10;
  activeFilter: string;
  products:Product[];
  categories:ProductCategory[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSelectionList, {static: true}) cat_list: MatSelectionList;

  constructor(
    private route: ActivatedRoute,
    private _catalogService : CatalogService,
    private _shopCardService : ShopCartService,
    private _authService : AuthenticationService,

    ) { 

  }

  ngOnInit() {
    const qparams = this.route.snapshot.queryParams;
    this.paginator.pageIndex  = +qparams['page'] > 1 ? +qparams['page'] - 1 : 0;
    this.paginator.pageSize =  +qparams['per_page'] > 0 ? +qparams['per_page'] : this.default_page_size;

    this._catalogService.getProductsCatalog(0, 100).subscribe(
      page => {
        this.categories = page.data;
        //this.categories.map(cat=>cat.cat_uri = `${environment.apiUrl}/home?category=${cat.name}`);
      }
    );

    // If the user changes the filter, reset back to the first page.
    this.cat_list.selectionChange.subscribe(() => this.paginator.pageIndex = 0);

// merge events
    merge(this.cat_list.selectionChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        
        const filter = this.cat_list.selectedOptions.selected[0] ? 
        `category=${this.cat_list.selectedOptions.selected[0].value}` : '';

          return this._catalogService.getProductsPage( 
            filter,
            "sort", 
            "order", 
            this.paginator.pageIndex,
            this.paginator.pageSize);    
      })
    ).subscribe(
      page => {
        this.paginator.length = page.total_count;
        this.products = page.data;
    })

  }//function

  addProdToCard(event:string, product_id:string) {
    const cart_id = this._authService.userValue.shopcart;
    this._shopCardService.addProduct(cart_id, product_id).subscribe(
      card=>{
        
      }
    );
  }
}
