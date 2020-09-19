import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomerService, AbstractCustomerService } from './Models/CustomerService';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { ProductService, AbstractProductService } from './Models/ProductService';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    ViewCartComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule, FormsModule,
    HttpClientModule,
  ],
  providers: [{provide: AbstractCustomerService,useClass: CustomerService},
              {provide:AbstractProductService,useClass:ProductService}],
  bootstrap: [AppComponent]
})
export class AppModule {}

 
 
