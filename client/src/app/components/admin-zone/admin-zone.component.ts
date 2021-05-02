import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { MainService } from 'src/app/services/main.service';



@Component({
  selector: 'app-admin-zone',
  templateUrl: './admin-zone.component.html',
  styleUrls: ['./admin-zone.component.css']
})


export class AdminZoneComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;


  constructor(
    public ms:MainService, 
    private r :Router,
   public catalogs:CatalogService,
   private fb:FormBuilder,
   public as:AdminService,

  ) { }
  searchWord : string
  searchErr : boolean = false
  categoryId = {Fruits:"5fd867130bfacd668c60d198", Vegetables:"5ff0d23f49905ce143a8869d", Herbs:"5ff0d40749905ce143a8869f"}
  adminForm:FormGroup
  choose_product


  ngOnInit(): void {
    let userlogged = false
    userlogged = this.ms.isLoggedIn()
  userlogged ? null : this.r.navigateByUrl('')

  this.adminForm= this.fb.group({
    category_id: ['', Validators.required], 
    name:['', Validators.required],
    price:['',Validators.required],
    image:['',Validators.required]
  })

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
      console.log(res)
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


receiveProduct($event){
  this.choose_product= $event
  console.log(this.choose_product) 
  this.adminForm.controls.category_id.setValue(this.choose_product.category_id._id)
  this.adminForm.controls.name.setValue(this.choose_product.name)
  this.adminForm.controls.price.setValue(this.choose_product.price)
  this.adminForm.controls.image.setValue(this.choose_product.image)

  this.as.sidenav=true

}

handleEdit(){
  this.as.editProduct(this.choose_product._id,  this.adminForm.value).subscribe(
    res => {

      this.catalogs.products_list = res
  
      this.ms.openSnackBar("Product edited successfully ")

      this.closeForm()
      this.choose_product=undefined

        },
    err =>{
     console.log(err)
     this.ms.openSnackBar(err.error._message)
  
    }
  )
}

addProduct(){
  this.as.sidenav=true
  this.choose_product=undefined
  this.clearForm()

}

closeForm(){
  this.as.sidenav=false
  this.clearForm()
}

clearForm(){
  if (this.adminForm.valid) {
    //clear form
    setTimeout(() => 
    this.formGroupDirective.resetForm(), 0)
  }
}
 
handleSubmit(){
this.as.addNewProduct(this.adminForm.value).subscribe(
  res => {
    this.catalogs.products_list = res
    this.ms.openSnackBar("Product added successfully ")
    this.closeForm()
  },
  err =>{
   console.log(err)
   this.ms.openSnackBar(err.error._message)

  }
)
}


}
