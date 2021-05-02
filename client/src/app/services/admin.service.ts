import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = "http://localhost:1000/admin"
  sidenav = false
 

  constructor(
    private http:HttpClient ,private r:Router
  ) { }



  addNewProduct(body){
    return this.http.post(this.baseUrl + '/add', body, {
      headers: { 'Content-Type': 'application/json' , 'Authorization':localStorage.token }
    })
  }
 
  editProduct(productId, body){
    return this.http.post(this.baseUrl + '/edit/' + productId, body, {
      headers: { 'Content-Type': 'application/json' , 'Authorization':localStorage.token }
    })
  }
}

