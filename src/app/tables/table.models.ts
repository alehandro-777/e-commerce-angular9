export class MatTableModel {
    title : string;
    //if table has complex spanned header
    header_cols:MatTableColumnModel[];
    data_cols:MatTableColumnModel[];
    //complex header model after parsing api response
    header_rows:MatTableRowModel[];
    //simple table model head+data+footer after parsing api response
    data_rows:MatTableRowModel[];
  
    constructor( title:string, rows:MatTableRowModel[] ){
      this.header_cols = [];
      this.data_cols = [];
      this.header_rows = [];
      this.data_rows = [];
      this.title = title;
  
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
  
  export class ApiTableData {
    rows : ApiRow[];
    total_count: number;
    fotter_row : ApiRow;
    title : string;
    constructor() {
      this.total_count =0;
      this.rows = []; 
      this.title = 'Title must be here !' 
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