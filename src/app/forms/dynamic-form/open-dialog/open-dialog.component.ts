import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DynamicFormComponent} from '../dynamic-form.component';
import { InputCfg } from '../input-cfg-model';

@Component({
  selector: 'open-dialog-button',
  templateUrl: './open-dialog.component.html',
  styleUrls: ['./open-dialog.component.css'],
})
export class OpenDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog
    ) 
    { }


ngOnInit() {

  }
openDialog(){
  const dialogConfig = new MatDialogConfig();
  //dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  
  dialogConfig.data = {};
  dialogConfig.data.title = 'Form title';

  const test = new InputCfg();
  test.value = '123.23';
  test.name = 'textbox1';
  test.label = 'Label 1';
  test.required = true;
  test.order = 1 ;
  test.type = 'text';
  test.input = 'input';

  const test1 = new InputCfg();
  test1.value = 'two';
  test1.name = 'select1';
  test1.label = 'Label 2';
  test1.required = false;
  test1.order = 2;
  test1.input = 'select';
  test1.options = [{key:'one', value:'Option 1'}, {key:'two', value:'Option 2'}, {key:'three', value:'Option 3'}];


  //options:[{key:string, value:string}] 
  dialogConfig.data.inputs = [test, test1,test, test1,test, test1,test, test1,test, test1,test, test1,test, test1,test, test1];

  const dialogRef = this.dialog.open(DynamicFormComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      alert(JSON.stringify(result));
      console.log(`Dialog result: ${result}`); 
    };
  });

}

}//CLass
