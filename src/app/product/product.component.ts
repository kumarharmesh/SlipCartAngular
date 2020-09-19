import { Component} from '@angular/core';
import { ProductService, AbstractProductService } from '../Models/ProductService';
import { Product } from '../Models/AppModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
  products:Product[];
  categories:string[];
  error:string; btnText:string;
  constructor(public service:AbstractProductService,private router:Router) 
  { 
         this.btnText="--Select a Category--";
         this.service.GetCategoryList().then(c=>this.categories=c).catch(e=>this.error=e.message);;
  }
  GetProductsCategoryWise(category:string):void
  {
        this.btnText=category;  
        this.service.GetProductsCategoryWise(category).then(p=>this.products=p).catch(e=>this.error=e.message);
  }
  addToCart(productId:number):void
  {
      this.service.addToCart(productId);
  }
  productsExistInCart():void
  {
     var exists:boolean=this.service.productsExistInCart();
     if(!exists)
     {
          alert("No Product in cart..");
     }
     else
     {
      this.router.navigate(["/viewcart"]);
     }
  }
}
