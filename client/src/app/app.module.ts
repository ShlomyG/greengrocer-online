import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AngularMaterialModule } from './modules/angular-material.module';
   
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
 
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component'; 
import { CartComponent } from './components/cart/cart.component'; 
import { ShoppingComponent } from './components/shopping/shopping.component'; 
import { CatalogComponent } from './components/catalog/catalog.component';
import { DialogComponent } from './components/catalog/dialog/dialog.component';
import { OrderComponent } from './components/order/order.component';
import { PlaceOrderComponent } from './components/order/place-order/place-order.component';
import { AdminZoneComponent } from './components/admin-zone/admin-zone.component';
     
@NgModule({    
  declarations: [  
    AppComponent, 
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    CartComponent,
    ShoppingComponent,
    CatalogComponent,
    DialogComponent,
    OrderComponent,
    PlaceOrderComponent,
    AdminZoneComponent    
  ],   
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // Ng2SearchPipeModule,
    AngularMaterialModule 
   
  ], 
  providers: [], 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
 
})  
export class AppModule { } 
 