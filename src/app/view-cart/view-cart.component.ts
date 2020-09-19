import { Component, OnInit } from '@angular/core';
import { AbstractProductService } from '../Models/ProductService';
import { Product, CustomerOrderDetails } from '../Models/AppModels';
import { CartProducts } from '../Models/ViewModels';
import { Router } from '@angular/router';
import { AbstractCustomerService } from '../Models/CustomerService';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent 
{
  quantityRange=[2,3,4,5,6,7,8,9,10];
  products:CartProducts[];   
  error:string; btnText:string;
  constructor(private service:AbstractProductService,private router:Router,private customerService:AbstractCustomerService) { 
    this.ViewCart();
  }
  ViewCart():void
  {
      this.service.ViewCart().then(p=>{
        this.products=p;
        this.products.filter(c=>c.quantity=1);
      }).catch(e=>this.error=e);
  }
  removeFromCart(productId:number):void{
    this.service.RemoveProductFromCart(productId);
    this.ViewCart();
  }
  placeOrder():void{

    var isLoggedInUser:boolean;

    if(this.service.productsExistInCart()==false)
    {
       alert('Cart is empty. Redirecting to Product page..');
       this.router.navigate(['/']);
    }
    else{
    isLoggedInUser=this.customerService.checkLoginStatus();
    this.service.saveCartProductsToSession(this.products);
    if(isLoggedInUser==true)
    {
      this.router.navigate(['/invoice']);
    }
    else
    {
      this.router.navigate(['/login']);
    }
  }
  }
}
