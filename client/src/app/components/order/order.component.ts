import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MainService } from 'src/app/services/main.service';
import { OrderService } from 'src/app/services/order.service';
import { PlaceOrderComponent } from './place-order/place-order.component';
  


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    public ms:MainService, 
    public cs:CartService, 
    public os:OrderService,
    private r:Router ,
    public dialog: MatDialog

  ) { }
  myFilter
  value: string;
  orderForm: FormGroup;
  minDate: Date = new Date()
  orderDone=false

  ngOnInit(): void { 
    let userlogged = false 
    userlogged = this.ms.isLoggedIn()
  userlogged ? null : this.r.navigateByUrl('')



  //disable delivery date's with 3 times 
  this.os.checkDeliveryDates().subscribe(
    (res:any) => {
      let allDupedDates = res.filter(i => i.count > 2).map(i => new Date(i.date))
      this.myFilter = (d: Date): boolean => {
        const day = d.getDay();
        const blockedDates = allDupedDates.map(date => date.setHours(0,0).valueOf());
        return (!blockedDates.includes(d.valueOf())) && day !== 6;
      }
    },
    err => console.log(err)
  )
  //disable order until tomorrow
  this.minDate.setDate(this.minDate.getDate() + 1);

 
  
  this.cs.getCart(this.ms.loggedUser._id).subscribe(
    res => {
      this.cs.loggedCart = res[0]
    },
      err =>{
        console.log(err) 
      }
    )
    

    this.orderForm= this.fb.group({ 
      user_id:this.ms.loggedUser._id,
      cart_id:this.cs.loggedCart._id,
      total_price:this.cs.loggedCart.total_price, 
      city: ['', Validators.required], 
      street:['', Validators.required],
      delivery_date:['',Validators.required],
      credit_card:['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]]
    })
    
  }

  sendOrder(){
    this.os.sendNewOrder(this.orderForm.value).subscribe(
      res => {
        this.dialog.open(PlaceOrderComponent);

        this.orderDone=true
      },
      err =>{
       this.ms.openSnackBar(err.error._message)
      }
    )
  
  }

  backToCart(){
    this.r.navigateByUrl("shopping")
  }

  getOrderDetails(){
      this.orderForm.controls.city.setValue(this.ms.loggedUser.city)
      this.orderForm.controls.street.setValue(this.ms.loggedUser.address)
  } 

  handleSearch() {
    const names = document.getElementsByClassName("name")
    var re = new RegExp(`${this.value}`,"i");
  
    for (let i = 0; i < names.length; i++) {
      names[i].innerHTML = names[i].textContent.replace( re, '<mark>' + this.value + '</mark>')
    }
  }

   
}
