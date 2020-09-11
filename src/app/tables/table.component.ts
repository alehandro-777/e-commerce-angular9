import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {from , merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'table-http',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
 
  exampleDatabase: FakeHttpDatabase | null;

  page_size : number =10;
  //table data array
  data: any[] = [];
  
  //footer row data
  footer_data: any = {};

  //if table has complex spanned header
  table_model: MatTableModel = new MatTableModel([]);
 
  //needed for paginator
  resultsLength = 0;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _httpClient: HttpClient,
    private route: ActivatedRoute
    ) {

  }

  ngOnInit(){
    const model = this.getTestTableModel_http();
    this.table_model = new MatTableModel(model);

    this.route.queryParams.subscribe(params => {
      this.paginator.pageIndex  = +params['page'];
      this.page_size = +params['per_page'];
    });


    this.exampleDatabase = new FakeHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.exampleDatabase!.getTestHttpData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.resultsLength = data.total_count;
          return data;
        }),
        catchError(() => {
          return observableOf(new ApiTableResponse);
        })
      ).subscribe(
        table => {
          this.data = this.ConvertApiRowsToTableRows(table.rows);

          this.footer_data = this.ConvertApiRowToTableRow(table.fotter_row);

        })
  }

  //displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  getTestTableModel_http() : MatTableRowModel[] {    
    //this.rows =   
    const header_row = new MatTableRowModel();

    const col1 = new MatTableColumnModel();
    col1.key = 'created1';
    col1.colspan= 2;
    col1.text= 'Создано';
    col1.type = 'header';
    col1.order = 1;

    const col2 = new MatTableColumnModel();
    col2.key = 'state1';
    col2.colspan= 2;
    col2.text= 'Состояние';
    col2.type = 'header';
    col2.order = 2;



    header_row.cols = [col1, col2];

    header_row.displayedColumns = header_row.cols.map(e=>e.key);

    header_row.type ='header';

    const data_row = new MatTableRowModel();

    const datacol1 = new MatTableColumnModel();
    datacol1.key = 'created_at';
    datacol1.type = 'row';
    datacol1.order = 1;
    datacol1.colspan= 1;
    datacol1.text= 'Создано';

    const datacol2 = new MatTableColumnModel();
    datacol2.key = 'state';
    datacol2.type = 'row';
    datacol2.order = 2;
    datacol2.colspan= 1;
    datacol2.text= 'Состояние';

    const datacol3 = new MatTableColumnModel();
    datacol3.key = 'number';
    datacol3.type = 'row';
    datacol3.order = 3;
    datacol3.colspan= 1;
    datacol3.text= 'Значание';

    const datacol4 = new MatTableColumnModel();
    datacol4.key = 'title';
    datacol4.type = 'row';
    datacol4.order = 4;
    datacol4.colspan= 1;
    datacol4.text= 'Название';

    data_row.cols = [datacol1, datacol2, datacol3, datacol4];
    data_row.displayedColumns = data_row.cols.map(e=>e.key);

    data_row.type ='row';

    return [header_row, data_row];

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


export class FakeHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getTotalData(){

  }

  getTestHttpData(sort: string, order: string, page: number): Observable<ApiTableResponse> {

//    const href = 'https://api.github.com/search/issues';
//    const requestUrl =
//        `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
//    return this._httpClient.get<GithubApi>(requestUrl);    

 const api = new ApiTableResponse();
    api.total_count = 100;

    api.rows = Array.from({ length: 10 }, (v, k) => {
      const new_row = new ApiRow();
      const col1 = new ApiColumn('created_at','created -1');
      const col2 = new ApiColumn('state','state -1');
      const col3 = new ApiColumn('number','number -1');
      const col4 = new ApiColumn('title','title -1');
      new_row.columns = [col1, col2,col3, col4];
      return new_row;
    });

    api.fotter_row = new ApiRow();
    const col1 = new ApiColumn('created_at','footer created -1');
    const col2 = new ApiColumn('state','footer state -1');
    const col3 = new ApiColumn('number','footer number -1');
    const col4 = new ApiColumn('title','footer title -1');
    api.fotter_row.columns = [col1, col2,col3, col4];

    const arr = [api];
    return from(arr);
  }
}

export class MatTableModel {
  //if table has complex spanned header
  header_cols:MatTableColumnModel[];
  data_cols:MatTableColumnModel[];
  //complex header model after parsing api response
  header_rows:MatTableRowModel[];
  //simple table model head+data+footer after parsing api response
  data_rows:MatTableRowModel[];

  constructor( rows: MatTableRowModel[] ){
    this.header_cols = [];
    this.data_cols = [];
    this.header_rows = [];
    this.data_rows = [];

    if (!MatTableRowModel) return;
    rows.forEach( row=>{

      if (row.type=='row') this.data_rows.push(row);
      if (row.type=='header') this.header_rows.push(row);

      row.cols.forEach(col=> {

        if (col.type=='row') this.data_cols.push(col);
        if (col.type=='header') this.header_cols.push(col);
      });
    })       
  }
}

export class MatTableRowModel {
  cols: MatTableColumnModel[];
  displayedColumns: string[]
  type: string;
}

export class MatTableColumnModel {
  key:string;
  colspan:number;
  text:string;
  type : string;
  order : number;
}

export class ApiTableResponse {
  rows : ApiRow[];
  total_count: number;
  fotter_row : ApiRow;

  constructor() {
    this.total_count =0;
    this.rows = [];  
  }
}
export class ApiRow {
  columns : ApiColumn[];
}

export class ApiColumn  {
  k: string;
  v: string;
  constructor(key:string, value:string) {
    this.k = key;
    this.v = value;
  }
}