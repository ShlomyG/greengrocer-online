import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient ,private r:Router) { }


  baseUrl: string = "http://localhost:1000/orders"

  
  checkDeliveryDates() {
    return this.http.get( this.baseUrl + '/check_delivery_date' , {
      headers: {'Authorization':localStorage.token}
    } )  
  }

  sendNewOrder(body){
    return this.http.post(this.baseUrl + '/add', body, {
      headers: { 'Content-Type': 'application/json' , 'Authorization':localStorage.token}
    }) 
  }

  
}

