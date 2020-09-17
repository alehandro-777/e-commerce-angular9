import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from './catalog.service'
import { Product, ProductCategory, ProductsPage, ProductsCategoryPage } from './catalog.model'
import {MatPaginator} from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {from , merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {environment} from '../../environments/environment'
import {MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  default_page_size = 10;

  products:Product[];
  categories:ProductCategory[];
  page_size = 10;
  
  //needed for paginator
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSelectionList, {static: true}) cat_list: MatSelectionList;

  constructor(
    private route: ActivatedRoute,
    private _catalogService : CatalogService) { 

  }

  ngOnInit() {
    const qparams = this.route.snapshot.queryParams;
    this.paginator.pageIndex  = +qparams['page'] > 1 ? +qparams['page'] - 1 : 0;
    this.page_size =  +qparams['per_page'] > 0 ? +qparams['per_page'] : this.default_page_size;

    this._catalogService.getProductsCatalog(0, 100).subscribe(
      page => {
        this.categories = page.data;
        this.categories.map(cat=>cat.cat_uri = `${environment.apiUrl}/home?category=${cat.name}`);
      }
    );

    // If the user changes the filter, reset back to the first page.
    this.cat_list.selectionChange.subscribe(() => this.paginator.pageIndex = 0);

// merge events
    merge(this.cat_list.selectionChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {

        if (this.cat_list.selectedOptions.selected[0]) {

          return this._catalogService.getProductsPage( 
            `category=${this.cat_list.selectedOptions.selected[0].value}`,
            "sort", 
            "order", 
            this.paginator.pageIndex,
            this.paginator.pageSize); 
        }
        else {

          return this._catalogService.getProductsPage(
            null,
            "sort", 
            "order", 
            this.paginator.pageIndex,
            this.paginator.pageSize); 
        }
     
      }),
      map(data => {
        this.resultsLength = data.total_count;
        return data;
      }),
      catchError(() => {
        return observableOf(new ProductsPage);
      })
    ).subscribe(
      page => {
        this.resultsLength = page.total_count;
        this.products = page.data;
    })

  }//function

}
