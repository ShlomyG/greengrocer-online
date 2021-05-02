import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog.service';
import { MainService } from 'src/app/services/main.service';
 
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
   
  constructor(  
    public ms:MainService, 
     private r :Router,
    public catalogs:CatalogService,
    ) { } 
    searchWord : string
    searchErr : boolean = false
    categoryId = {Fruits:"5fd867130bfacd668c60d198", Vegetables:"5ff0d23f49905ce143a8869d", Herbs:"5ff0d40749905ce143a8869f"}
  ngOnInit(): void {
    let userlogged = false
      userlogged = this.ms.isLoggedIn()
    userlogged ? null : this.r.navigateByUrl('') 
  }
    
  ChangeCategory(categoryId){ 
    this.catalogs.getProductsByCategory(categoryId).subscribe(
      res => {
          this.catalogs.products_list = res
        console.log(this.catalogs.products_list), 
        err =>{  
            console.log(err) 
        }
      }
        )
}

  SearchProducts(product){
    this.catalogs.getProductsBySearch(product).subscribe(
      res => {
        if(!res[0])
        {
          this.ms.openSnackBar("Product is not found")
        }else{
          this.catalogs.products_list = res
          this.searchErr = false  
        }
        err =>{  
            console.log(err)
        }
      }
        )
 
  } 
 

  
} 
 