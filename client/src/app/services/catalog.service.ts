import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  products_list  
 
  constructor(private http:HttpClient ,private r:Router) { }

  getProducts() {
    return this.http.get( 'http://localhost:1000/products', {
      headers: {'Authorization':localStorage.token}
    } )  
  } 
  getProductsByCategory(categoryId) {
    return this.http.get( 'http://localhost:1000/products/getByCategory/' + categoryId )
  }
  getProductsBySearch(product) {
    return this.http.get( 'http://localhost:1000/products/search_product/' + product )
  }
}






