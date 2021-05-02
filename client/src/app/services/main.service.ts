import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http:HttpClient,
    private r:Router,
    private _snackBar: MatSnackBar
    ) { } 
 
  loggedUser 
  baseUrl: string = "http://localhost:1000/user"
  cities = ["Tel-aviv","Haifa","Jerusalem","Yavne","Ra'anana",
  "Ramat-Gan","Bat-Yam","Ramat-HaSharon","Rishon Lezion","Holon","Rehovot","Beer Yakov"]


 
  getAllProducts(){  //without token
    return this.http.get( 'http://localhost:1000/products', {
      headers: { 'Content-Type': 'application/json' }
    }) 
  }
  
  getAllOrders(){    //without token
    return this.http.get( 'http://localhost:1000/orders', {
      headers: { 'Content-Type': 'application/json' }
    })
  } 



  firstLoad(token){
    return this.http.get( this.baseUrl , {
      headers:{'Authorization':token}
    })
  }

  isLoggedIn() {
    return !!this.loggedUser?.userId
  }

  login(body) {
    return this.http.post(this.baseUrl + '/login', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
 
  registerFirstStep(body) {
    return this.http.post(this.baseUrl + '/register_first_step', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  } 

  register(body) {
    return this.http.post(this.baseUrl + '/register', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  logout() {
    localStorage.removeItem("token")
    this.loggedUser = undefined
    this.r.navigateByUrl('/login')
  }
  
  openCartToUser(userId){ 
    return this.http.get(this.baseUrl + '/new_cart/' + userId, {
      headers: { 'Content-Type': 'application/json' ,'Authorization':localStorage.token}
    })   
  }



  openSnackBar(message: string) {
    this._snackBar.open(message, "ok", {
      duration: 2600,
    });
  }


}
