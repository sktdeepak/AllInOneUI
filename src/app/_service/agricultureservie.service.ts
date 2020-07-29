import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Constants } from '../constants';
import { FieldWorkModel, PriceModel, SearchModel } from '../_model/user'
import { Fieldworkresponse } from '../_model/Response/fieldworkresponse';


const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' })

};


@Injectable({
  providedIn: 'root'
})
export class AgricultureservieService {

  constructor(private http: HttpClient) { }



  GetFieldWorkList(): Observable<Fieldworkresponse> {
    console.log(Constants.BaseURL + 'Agriculture/GetFieldWorkList');
    return this.http.get<Fieldworkresponse>(Constants.BaseURL + 'Agriculture/GetFieldWorkList', httpOptions).pipe(
      map(result => {
        console.log(result);
        return result;
      }),
      catchError(this.handleError)
    );
  }

  SearchFieldWorkList(userId:number): Observable<Fieldworkresponse> {
    console.log('Agriculture/SearchFieldWorkListByUserId/'+userId);
    return this.http.get<Fieldworkresponse>(Constants.BaseURL + 'Agriculture/SearchFieldWorkListByUserId/'+userId, httpOptions).pipe(
      map(result => {
        console.log(result);
        return result;
      }),
      catchError(this.handleError)
    );
  }

  SearchFieldWorkListView(searchModel: SearchModel): Observable<Fieldworkresponse> {
    return this.http.post<Fieldworkresponse>(Constants.BaseURL + 'Agriculture/SearchFieldWorkListByViewType',searchModel, httpOptions).pipe(
      map(result => {
        console.log('Search FieldWorkList '+result);
        return result;
      }),
      catchError(this.handleError)
    );
  }


  SaveFieldWork(fieldWorkModel: FieldWorkModel): Observable<number> {
    console.log("ieldWorkModel.Id :"+fieldWorkModel.Id);
    let addOrUpdateURL = Constants.BaseURL + (fieldWorkModel.Id == 0 ? 'Agriculture/SubmitFieldWork' : 'Agriculture/UpdateFieldWork');
    console.log(addOrUpdateURL);

    return this.http.post<number>(addOrUpdateURL, fieldWorkModel, httpOptions).pipe(
      map(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  DeleteFieldWork(id: number) {
    let addOrUpdateURL = Constants.BaseURL +'Agriculture/DeleteFieldWork/'+id ;
    console.log(addOrUpdateURL);

    return this.http.delete(addOrUpdateURL, httpOptions).pipe(
      map(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }
//Price
  GetPriceList(): Observable<PriceModel[]> {
    console.log(Constants.BaseURL + 'Agriculture/GetPriceList');
    return this.http.get<PriceModel[]>(Constants.BaseURL + 'Agriculture/GetPriceList', httpOptions).pipe(
      map(result => {
        console.log(result);
        return result;
      }),
      catchError(this.handleError)
    );
  }

  SavePrice(PriceModel: PriceModel): Observable<number> {
    console.log("PriceModel.Id :"+PriceModel.Id);
    let addOrUpdateURL = Constants.BaseURL + (PriceModel.Id == 0 ? 'Agriculture/SubmitPrice' : 'Agriculture/UpdatePrice');
    console.log(addOrUpdateURL);

    return this.http.post<number>(addOrUpdateURL, PriceModel, httpOptions).pipe(
      map(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  DeletePrice(id: number) {
    let addOrUpdateURL = Constants.BaseURL +'Agriculture/DeletePrice/'+id ;
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