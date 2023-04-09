import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private baseurl:string="http://localhost:2411";
  

  constructor(private http:HttpClient) { }

  createAccount(data: any) : Observable<any> 
  {
    return this.http.post(`${this.baseurl}/newuser`,data);
  }

  getCardDetails(cardNumber : string, pin : string) :  Observable<any>  {

    const url =`${this.baseurl}/user/${cardNumber}/${pin}`;  
    return this.http.get<any>(url,this.httpOptions).pipe(
      retry(1),catchError(this.handleError)
    );

  }
  changePin(cardNumber : string, pin : string, newPin : string) : Observable<any> {
    const url = `${this.baseurl}/changepin/${cardNumber}/${pin}/${newPin}`;
    return this.http.put<any>(url,this.httpOptions).pipe(
      retry(1),catchError(this.handleError)
    );
  }

  withdraw(cardNumber : string, pin : string, amount : string) : Observable<any>{
    const url = `${this.baseurl}/withdraw/${cardNumber}/${pin}/${amount}`;;
    return this.http.post<any>(url,null);
  }

  deposite(cardNumber : string, pin : string, amount : string) : Observable<any>{
    const url = `${this.baseurl}/deposite/${cardNumber}/${pin}/${amount}`;
    return this.http.post<any>(url,null);
    
  }
  checkBalance(cardNumber: string, pin: string): Observable<number> {
    const url = `${this.baseurl}/checkbalance?cardNumber=${cardNumber}&Pin=${pin}`;
    return this.http.get<number>(url);
  }


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
   

}
