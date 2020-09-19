import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { InvoiceComponent } from './invoice/invoice.component';


 const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path:'',component:ProductComponent,pathMatch:"full"},
    {path:'login',component:LoginComponent},
    {path:"viewcart",component:ViewCartComponent},
    {path:'invoice',component:InvoiceComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
