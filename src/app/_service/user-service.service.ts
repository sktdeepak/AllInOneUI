import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Constants } from '../constants';
import {UserInfo,UserInfoModel} from '../_model/user'

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' ,'Content-Type':'application/json; charset=utf-8'})

};



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  SubmitUserDetails(userinfo:UserInfo) {
    console.log(userinfo);
    console.log(Constants.BaseURL +  'user/submituser');
    return this.http.post<any>(Constants.BaseURL +  'user/submituser',userinfo, httpOptions).pipe(
        map(result => {
                return result;
            }),
        catchError(this.handleError)
      );
  }

  ViewUserDetails(): Observable<UserInfoModel[]> {
    console.log(Constants.BaseURL +  'user/submituser');
    return this.http.get<UserInfoModel[]>(Constants.BaseURL +  'User/GetUserList', httpOptions).pipe(
        map(result => {
                return result;
            }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

}
