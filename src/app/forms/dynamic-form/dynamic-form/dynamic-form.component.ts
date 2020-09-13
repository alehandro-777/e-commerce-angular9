import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators }                 from '@angular/forms';
import { InputCfg } from '../../input-cfg-model';
import {FormService} from '../../form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  constructor(
      private _formService : FormService,
    ) 
    { }

    title: string = 'Not set';
    inputs: InputCfg[] = [];
    form: FormGroup;  

  ngOnInit() {
    this._formService.getDynamicFormConfig('form_id').subscribe(
      data=>{
        this.title = data.title;
        this.inputs = data.inputs;
        this.form = this.toFormGroup( this.inputs );
      });

  }
  
  onNoClick(): void {
    //this.dialogRef.close();
  }

  onOkClick() {
    //this.dialogRef.close(this.form.value);
  }

  toFormGroup(questions: InputCfg[] ) {
    let group: any = {};

    questions.forEach(html_input => {
      group[html_input.name] = html_input.required ? 
        new FormControl(html_input.value || '', Validators.required)
        : 
        new FormControl(html_input.value || '');
    });
    return new FormGroup(group);
  }

}

