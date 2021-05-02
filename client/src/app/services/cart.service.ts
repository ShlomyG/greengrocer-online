import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = "http://localhost:1000/user"
  loggedCart : any = [] 
  
  constructor(private http:HttpClient ,private r:Router) {
     
  }
      getCart(_id) {
        return this.http.get( 'http://localhost:1000/user/getCartByUser/' + _id,{
        headers: {'Authorization':localStorage.token}
      })  } 

        addProductToCart(cartId ,body){
          return this.http.post(this.baseUrl + '/add_product_to_cart/' + cartId , body, {
            headers: { 'Content-Type': 'application/json' , 'Authorization':localStorage.token}
          
          })
        }
        
        removeItemFromCart(cartId,body){
          return this.http.post(this.baseUrl + '/remove_product_from_cart/' + cartId , body, {
            headers: { 'Content-Type': 'application/json' , 'Authorization':localStorage.token}
          }) 
        }
  
        clearAllItems(cartId){ 
          return this.http.delete(this.baseUrl + '/clear_cart/' + cartId , {
            headers: { 'Content-Type': 'application/json' , 'Authorization':localStorage.token }
          }) 
        } 

        
}
