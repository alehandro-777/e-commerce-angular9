import { Injectable } from '@angular/core';
import {InputCfg} from './input-cfg-model'
import {DynamicFormModel} from './form.model'
import { from, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {DynamicDialogFormComponent} from './dynamic-dialog-form/dynamic-dialog-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    public dialog: MatDialog,

  ) { }

  openDialog(form_id : string){
    this.getDynamicFormConfig('form_id').subscribe(
      data=>{
        const dialogConfig = new MatDialogConfig();
        //dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        
        dialogConfig.data = {};
        dialogConfig.data.title = data.title;
        dialogConfig.data.inputs = data.inputs;
      
        const dialogRef = this.dialog.open(DynamicDialogFormComponent, dialogConfig);
      
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.postFormData('form_id', result);
          };
        });

    });//getDynamicFormConfig
  
  }

getDynamicFormConfig(form_id : string) : Observable<DynamicFormModel> {

  const form_model = new DynamicFormModel();

  form_model.title = 'Form XXX title';

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

  form_model.inputs = [test, test1];
  return from([form_model]);

}

postFormData(form_id : string, json : string) {
  alert(JSON.stringify(json));
}

}
