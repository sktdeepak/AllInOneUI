import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Constants } from '../../constants';
import { ProductPriceDetailModel } from '../../_model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductBuySellService {
  serviceURL:string='';
  
  constructor(private http: HttpClient) {
    this.serviceURL = Constants.BaseURL + 'Product/';
   }



  GetProductPriceDetailList(): Observable<ProductPriceDetailModel[]> {
    return this.http.get<ProductPriceDetailModel[]>(this.serviceURL+'GetProductPrice', httpOptions).pipe(
      map(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }


  SaveProductPriceDetail(productModel: ProductPriceDetailModel): Observable<ProductPriceDetailModel[]> {
    return this.http.post<ProductPriceDetailModel[]>(this.serviceURL+'SaveProductPrice', productModel, httpOptions).pipe(
      map(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  UpdateUserPriceDetail(productModel: ProductPriceDetailModel): Observable<ProductPriceDetailModel[]> {
    let addOrUpdateURL = this.serviceURL +productModel.id;
    console.log(addOrUpdateURL);

    return this.http.put<ProductPriceDetailModel[]>(addOrUpdateURL+'UpdateProductPrice', productModel, httpOptions).pipe(
      map(result => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  DeleteFieldWork(id: number) {
    let addOrUpdateURL = Constants.BaseURL +'Product/DeleteProductPrice'+id ;
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