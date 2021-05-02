import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { MainService } from 'src/app/services/main.service';
import { DialogComponent } from './dialog/dialog.component';
    
@Component({  
  selector: 'app-catalog', 
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
   
  choose_product
  quantity_of_product=1
  adminActive = false

  @Output() editEvent = new EventEmitter<string>();


  constructor(
    public ms:MainService, 
    public cs: CartService,
    public dialog: MatDialog,
    public catalogs: CatalogService

  ) { } 

  ngOnInit(): void { 
    
    this.ms.getAllProducts().subscribe(
      res => {
          this.catalogs.products_list = res, 
        err =>{
            console.log(err)
        }
      }  
        )
        
        if(this.ms.loggedUser.admin)
        {this.adminActive=true}

      }  
      
      editProduct(item): void {
        this.choose_product =item
        this.editEvent.emit(this.choose_product)


      }
       
      openDialog(item): void {
        console.log(item)  
        this.choose_product =item
        const dialogRef = this.dialog.open(DialogComponent, { 
          data: {product: this.choose_product.name, quantity:this.quantity_of_product, product_id:this.choose_product._id,price:this.choose_product.price}
        });
        
        dialogRef.afterClosed().subscribe(result => {
          this.cs.addProductToCart(this.cs.loggedCart._id ,result ).subscribe(
            res => { 
              this.cs.loggedCart = res[0]
              err =>{  
                console.log(err)
              }
            } 
            )
          });
        } 
        
 

}
