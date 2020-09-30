import { Injectable } from '@angular/core';
import {AsyncValidatorFn, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UniqueLoginValidatorService {

  constructor(
    private http: HttpClient
  ) { }

  validate(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      console.log(ctrl);
      return this.http.get<any>(`${environment.apiUrl}/logins/${ctrl.value}`)
      .pipe(
        tap(ev => console.log("tap", ev)),
        map(resp => {
          console.log(resp);
          return  !resp.free ? { uniqueLogin: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  } 
}
