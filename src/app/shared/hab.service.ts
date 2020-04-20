import { Habitacion } from './habitacion';
import { Likes } from './likes';
import { user } from './../classes/user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs/operators'
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators'
import {Habitaciones} from './../classes/Habitaciones'
import { throwError } from 'rxjs'; 
import { Customer } from './customer';




@Injectable({
  providedIn: 'root'
})

export class habService {

  nombre: string;
  descripcion: string;
  image: string;
  userN: string;
  userA: string;
  userI:string;
  summary:string
  telefono:string
  correo: string

  private id: number;

  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json'})
  };

  apiUrl:string='http://localhost:3000/api/'

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
        console.log(error.error.message);
    }
    else{
      console.error('Error status: ${error.status}, error: {error.error}');
    }
    return throwError('Hubo un errror')
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  

  getKey(){
    return this.id;
  }


setKey(idx:number){
      this.id=idx;
}

  getHab():Observable<Habitaciones[]>{
    return this.http.get<Habitaciones[]>('http://localhost:3000/api/habitaciones', this.httpOptions).pipe(
       catchError(this.handleError)
    )
  }
  
  getExp():Observable<Habitaciones[]>{
    return this.http.get<Habitaciones[]>('http://localhost:3000/api/explore', this.httpOptions).pipe(
       catchError(this.handleError)
    )
  }


  getMaxUser():Observable<user[]>{
    return this.http.get<user[]>('http://localhost:3000/api/max', this.httpOptions).pipe(
       catchError(this.handleError)
    )
  }

  getMaxHab():Observable<Habitaciones[]>{
    return this.http.get<Habitaciones[]>('http://localhost:3000/api/max', this.httpOptions).pipe(
       catchError(this.handleError)
    )
  }
  getuser(idx:number):Observable<user[]>{
    let url=`${this.apiUrl}user/${idx}`
    return this.http.get<user[]>(url, this.httpOptions).pipe(
      tap(data=>{console.log(JSON.stringify(data))}),
      catchError(this.handleError)
    );
  }
  
  check(email:string,pass:string):Observable<user[]>{
    let url=`${this.apiUrl}check/${email}/${pass}`
    return this.http.get<user[]>(url, this.httpOptions).pipe(
      tap(data=>{console.log(JSON.stringify(data))}),
      catchError(this.handleError)
    );
  }


  buscarHeroes(termino:string):Observable<Habitaciones[]>{
    let url=`${this.apiUrl}buscar/${termino}`;
    return this.http.get<Habitaciones[]>(/*url+`buscar/${termino}`*/url, this.httpOptions).pipe(
      tap(data=>{console.log(JSON.stringify(data)) }),
      catchError(this.handleError)
    );
  }




  constructor(private http: HttpClient) { }

  addCustomer(customer: Customer): Observable<any> {
    return this.http.post<Customer>('http://localhost:3000/api/create-customer', customer, this.httpOptions)
      .pipe(
        catchError(this.handleError2<Customer>('Add Customer'))
      );
  }

  addHab(hab: Habitacion): Observable<any> {
    return this.http.post<Habitacion>('http://localhost:3000/api/upload-hab', hab, this.httpOptions)
      .pipe(
        catchError(this.handleError2<Customer>('Add Customer'))
      );
  }

  like(like: Likes): Observable<any> {

    console.log(like)
    return this.http.post<Customer>('http://localhost:3000/likes', like, this.httpOptions)
      .pipe(
        catchError(this.handleError2<Customer>('Add Customer'))
      );
  }

  private handleError2<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
 
}