import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators }                 from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InputCfg } from './input-cfg-model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  constructor(
      public dialogRef: MatDialogRef<DynamicFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data
    ) 
    { }

    title: string = 'Not set';
    inputs: InputCfg[] = [];
    form: FormGroup;  

  ngOnInit() {
    this.title = this.data.title;
    this.inputs = this.data.inputs;
    this.form = this.toFormGroup( this.inputs );
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    this.dialogRef.close(this.form.value);
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
