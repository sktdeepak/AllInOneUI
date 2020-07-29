import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Constants } from '../../constants';
import { UserPriceDetailModel } from '../../_model/user'
const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' })

};
@Injectable({
  providedIn: 'root'
})
export class UserPriceDetailService {

  constructor(private http: HttpClient) { }



  GetUserPriceDetailList(): Observable<UserPriceDetailModel[]> {
    console.log(Constants.BaseURL + 'Price');
    return this.http.get<UserPriceDetailModel[]>(Constants.BaseURL + 'Price', httpOptions).pipe(
      map(result => {
        console.log(result);
        return result;
      }),
      catchError(this.handleError)
    );
  }

  SearchUserPriceDetailList(id:number): Observable<UserPriceDetailModel[]> {
    console.log('Price/'+id);
    return this.http.get<UserPriceDetailModel[]>(Constants.BaseURL + 'Price/'+id, httpOptions).pipe(
      map(result => {
        console.log(result);
        return result;
      }),
      catchError(this.handleError)
    );
  }


  SaveUserPriceDetail(userPriceDetailModel: UserPriceDetailModel): Observable<UserPriceDetailModel[]> {
    console.log("ieldWorkModel.Id :"+userPriceDetailModel.Id);
    let addOrUpdateURL = Constants.BaseURL + 'Price';
    console.log(addOrUpdateURL);

    return this.http.post<UserPriceDetailModel[]>(addOrUpdateURL, userPriceDetailModel, httpOptions).pipe(
      map(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  UpdateUserPriceDetail(userPriceDetailModel: UserPriceDetailModel): Observable<UserPriceDetailModel[]> {
    console.log("ieldWorkModel.Id :"+userPriceDetailModel.Id);
    let addOrUpdateURL = Constants.BaseURL + 'Price/' +userPriceDetailModel.Id;
    console.log(addOrUpdateURL);

    return this.http.put<UserPriceDetailModel[]>(addOrUpdateURL, userPriceDetailModel, httpOptions).pipe(
      map(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  DeleteFieldWork(id: number) {
    let addOrUpdateURL = Constants.BaseURL +'Price/'+id ;
    console.log(addOrUpdateURL);

    return this.http.delete(addOrUpdateURL, httpOptions).pipe(
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