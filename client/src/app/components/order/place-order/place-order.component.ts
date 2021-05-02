import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
 
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
}) 
export class PlaceOrderComponent implements OnInit {

  constructor(
    public os:OrderService,
    public cs:CartService,
    private r:Router,
    public dialogRef: MatDialogRef<PlaceOrderComponent>
  ) { }

  ngOnInit(): void { 
  } 
 
  createRecipt(){  
      let element = document.getElementById('table')
      html2canvas(element).then((canvas) => {
        let imgData = canvas.toDataURL('image/png')
        let doc = new jsPDF()
        let imageHeight = canvas.height * 208 / canvas.width
        doc.addImage(imgData, 0, 0, 208, imageHeight)
        doc.save("image.pdf")
  
        this.clearCart(this.cs.loggedCart._id)
        this.r.navigateByUrl("")

        
      })
    } 
        closeOrder(){
          this.clearCart(this.cs.loggedCart._id)
          this.r.navigateByUrl("")
        }
    clearCart(cartId) {
      this.cs.clearAllItems(cartId).subscribe(
        res => {
          this.cs.loggedCart = res[0]
          err => console.log(err)
        }
      )
    } 
}
