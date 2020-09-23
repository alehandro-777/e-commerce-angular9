import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ProductCategory, ProductsCategoryPage} from '../../../home/catalog.model'
import {from ,fromEvent, merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProdCatService} from '../prod-cat.service'

@Component({
  selector: 'app-prod-cat-list',
  templateUrl: './prod-cat-list.component.html',
  styleUrls: ['./prod-cat-list.component.css']
})
export class ProdCatListComponent implements OnInit {
  default_page_size = 10;

  activeFilter: string ='';
  cats:ProductCategory[];

  page_size = 10;
  
  //needed for paginator
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(
    private route: ActivatedRoute,
    private _http : ProdCatService

  ) { }

  ngOnInit() {
    const qparams = this.route.snapshot.queryParams;
    this.paginator.pageIndex  = +qparams['page'] > 1 ? +qparams['page'] - 1 : 0;
    this.page_size =  +qparams['per_page'] > 0 ? +qparams['per_page'] : this.default_page_size;

    this.bindEvents();

  }

  deleteCat(id : string) {
    this._http.deleteCategory(id)
    .pipe(
      startWith({}),
      switchMap(() => {
        return this._http.getCategoiesPage(
          this.paginator.pageIndex,
          this.paginator.pageSize); 
     
      }),
      catchError(() => {
        return observableOf(new ProductsCategoryPage);
      })
    ).subscribe(
      page => {
        this.resultsLength = page.total_count;
        this.cats = page.data;
    })
  }

  bindEvents(){
        // merge events
        merge(this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            return this._http.getCategoiesPage(
              this.paginator.pageIndex,
              this.paginator.pageSize); 
         
          }),
          catchError(() => {
            return observableOf(new ProductsCategoryPage);
          })
        ).subscribe(
          page => {
            this.resultsLength = page.total_count;
            this.cats = page.data;
        })
  }

}
