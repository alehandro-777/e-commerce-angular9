import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {MatTableModel, ApiTableData, MatTableRowModel, MatTableColumnModel, ApiRow, ApiColumn} from './table.models';


@Injectable({
  providedIn: 'root'
})

export class TableHttpService {
  
  configUrl : string = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  //displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  getTableModel(table_id : string) : Observable<MatTableModel> {    
 
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

    const res_arr = [ new MatTableModel( 'Table title description 1',  [header_row, data_row])]
    return  from(res_arr);

  }

  getHttpData(sort: string, order: string, page: number): Observable<ApiTableData> {

//    const href = 'https://api.github.com/search/issues';
//    const requestUrl =
//        `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
//    return this._httpClient.get<GithubApi>(requestUrl);    

 const api = new ApiTableData();
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
