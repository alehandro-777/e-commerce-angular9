import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogService } from './catalog.service'
import { Product, ProductCategory, ProductsPage, ProductsCategoryPage } from './catalog.model'
import {MatPaginator} from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {from , merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  products:Product[];
  categories:ProductCategory[];
  page_size = 10;
  //needed for paginator
  resultsLength = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private _catalogService : CatalogService) { 

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.paginator.pageIndex  = +params['page'] > 0 ? +params['page'] : 0;
      this.page_size =  +params['per_page'] > 0 ? +params['per_page'] : 9;
    });

    this._catalogService.getProductsCatalog().subscribe(
      page => {
        this.categories = page.data;
        //this.page_size =
      }
    );
//
merge(this.paginator.page)
.pipe(
  startWith({}),
  switchMap(() => {
    return this._catalogService.getProductsPage("sort", "order", this.paginator.pageIndex);      
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
