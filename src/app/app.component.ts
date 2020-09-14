import { Component } from '@angular/core';
import {FormService} from './forms/form.service'
import {AuthenticationService} from './login/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private _authService : AuthenticationService,
    private _formService : FormService) {}

  openDialogForm(){
    this._formService.openDialog('form_id');
  }

  logout(){
    this._authService.logout(); 
  }

}

