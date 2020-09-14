import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {TableHttpService} from './table.services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {from , merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModel, ApiTableData, ApiRow} from './table.models';

@Component({
  selector: 'table-http',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
 
  page_size = 10;
  //table data array
  data = [];
  
  //footer row data
  footer_data  = {};

  //if table has complex spanned header
  table_model: MatTableModel = new MatTableModel('Table must be here', []);
 
  //needed for paginator
  resultsLength = 0;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dataService: TableHttpService,
    private route: ActivatedRoute
    ) {
      this.page_size  =10;
  }

  ngOnInit(){
    this.dataService.getTableModel('table_id').subscribe( 
      (table_model)=>{
        this.table_model = table_model;
    } );

    this.route.queryParams.subscribe(params => {
      this.paginator.pageIndex  = +params['page'] > 0 ? +params['page'] : 0;
      this.page_size =  +params['per_page'] > 0 ? +params['per_page'] : 10;
    });



    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.dataService!.getHttpData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          this.resultsLength = data.total_count;
          return data;
        }),
        catchError(() => {
          return observableOf(new ApiTableData);
        })
      ).subscribe(
        table => {
          this.data = this.ConvertApiRowsToTableRows(table.rows);
          this.footer_data = this.ConvertApiRowToTableRow(table.fotter_row);
        })
  }


  ConvertApiRowsToTableRows(apiKvpRows: ApiRow[]) :any[] {  
    return apiKvpRows!.map( (kvp_row) => this.ConvertApiRowToTableRow(kvp_row));
  }

  ConvertApiRowToTableRow(apiKvpRow: ApiRow) :any {
    return apiKvpRow!.columns.reduce((prev, curr)=> {
      prev[curr.k] = curr.v;
      return prev;
    }, {});
  }

}



