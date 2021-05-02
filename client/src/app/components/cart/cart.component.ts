import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MainService } from 'src/app/services/main.service';



@Component({ 
  selector: 'app-cart', 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})  


export class CartComponent implements OnInit {



  
  constructor(
    public ms:MainService,
    public cs: CartService
 
  ) { } 
  product_id: string


   ngOnInit():void {
    console.log(this.ms.loggedUser) 
    this.cs.getCart(this.ms.loggedUser._id).subscribe(
      res => {
          this.cs.loggedCart = res[0]
        err =>{
            console.log(err) 
        }
      }
        )
  }

  clearCart(cartId) {
    this.cs.clearAllItems(cartId).subscribe(
      res => {
        this.cs.loggedCart = res[0]
        err => console.log(err)
      }
    )
  } 
 
  removeItem(cartId, product_id) {
    this.cs.removeItemFromCart(cartId, {product_id}).subscribe(
      res => {
          this.cs.loggedCart = res[0]
        err =>{
            console.log(err) 
        }
      }
        )  }

}
