import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment'
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  constructor(
    private fb:FormBuilder,
    public ms:MainService,
    private r:Router,
    public cs:CartService
    ) { }
   
  loginForm:FormGroup
  productsInStock
  userCart
  shoppingStatusMsg :string
  openCart
  ordersPlaced
  lastOrder
 

  ngOnInit(): void { 


    this.ms.getAllProducts().subscribe(
      res => {
        this.productsInStock = res
      }
    )

    this.ms.getAllOrders().subscribe(
      res => {
        this.ordersPlaced = res
      }
      )


      if(localStorage.token)
    {
    this.ms.firstLoad(localStorage.token).subscribe(
      res => {
        this.ms.loggedUser=res 
        this.adminCheck()

        console.log(res), 
        err =>{
            console.log(err)
        }
      }
        )
      }

    this.loginForm= this.fb.group({
      userId: ['', Validators.required],
      password:['', Validators.required]
    })




 
  }




  handleSubmit(){
    this.ms.login(this.loginForm.value).subscribe(
      (res:{error,access_token})=>{
        if(!res.error){
          localStorage.token = res.access_token
          this.ms.loggedUser = jwtDecode(res.access_token)
          this.adminCheck()
 
        }
      },err => {
        console.log(err)
        this.ms.openSnackBar(err.error.msg)
      }
    )
    }


    getMessegeToUserByCart(_id){
      this.cs.getCart(_id).subscribe(
        (res) => {
         this.userCart = res
         if(this.userCart.length==0)
         {this.shoppingStatusMsg="Welcome to your first buy, Enter to open cart"
        this.openCart=false
        this.ms.openCartToUser(this.ms.loggedUser._id).subscribe(
          (res:any) => 
          this.cs.loggedCart=res,
          err => console.log(err)
        )
      }
         else if (this.userCart[0].products.length==0){
          this.lastOrder = this.ordersPlaced.slice().reverse().find(order => order.user_id === this.ms.loggedUser._id); 
          this.shoppingStatusMsg="Hello again, your last order in " + moment(this.lastOrder.creation_date).format('DD/MM/YYYY')
         this.openCart=false }
         else if (this.userCart[0].products.length>0)
         {this.shoppingStatusMsg="You have a active cart from " + moment(this.userCart[0].creationDate).format('DD/MM/YYYY') + " in total price of " + this.userCart[0].total_price.toFixed(1)  + "₪" 
         this.openCart=true
        }
 
        }

      )
    }
 
    enterToShopping(){
     this.r.navigateByUrl('/shopping')
    }  
  
    adminCheck(){
      if(this.ms.loggedUser.admin){
        this.r.navigateByUrl('/admin')
      }else{
      this.getMessegeToUserByCart(this.ms.loggedUser._id)}
    }  

}
