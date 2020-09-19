import {RouterTestingModule} from '@angular/router/testing/';
import { Product, CustomerOrderDetails, InvoiceData } from '../Models/AppModels';
import { AbstractProductService } from '../Models/ProductService';
import { CartProducts } from '../Models/ViewModels';
import { ProductComponent } from './product.component';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

describe("Product component tests",()=>{
  var fixture:ComponentFixture<ProductComponent>;
  var component:ProductComponent;
  var routeSpy;
  var router:Router;
beforeEach((async()=>{
   TestBed.configureTestingModule({
     imports:[RouterTestingModule],
     declarations:[ProductComponent],
     providers:[{provide:AbstractProductService,useClass:FakeProductSvc}]
   }).compileComponents();
  
}));

beforeEach(()=>{
  router=TestBed.get(Router);
  routeSpy=spyOn(router,'navigate');
  fixture=TestBed.createComponent(ProductComponent);
  component=fixture.componentInstance;
  fixture.detectChanges();
});
it('GetProductsCategoryWise Test',fakeAsync(()=>{
    
       component.GetProductsCategoryWise("testcategory");
       tick(400);
       expect(component.products).not.toBeNull();
       expect(component.products.length).toEqual(2);
  }));

  it(' addToCart Test',()=>{
      // addToCart in ProductComponent has only one line of code, that is a function call addToCart(productId);
      // methods toHaveBeenCalledTimes and
      // toHaveBeenCalledWith  cannot work without spies so,
      // we get reference of injected service object in obj and then add a mock of it using spyOn
      // now we can use above-mentioned two functions. Although no need of doing this if these two functions or other like them are not compulsory.     
      var obj=TestBed.get(AbstractProductService);
      spyOn(obj,"addToCart");
      component.addToCart(12);
      expect(obj.addToCart).toHaveBeenCalledTimes(1);
      expect(obj.addToCart).toHaveBeenCalledWith(12);
  });

  it('productsExistInCart Test',()=>{
        component.productsExistInCart();   
        //if result is true   //change false to true in productsExistInCart in FakeProductService
              expect(routeSpy).toHaveBeenCalled();
              expect(routeSpy).toHaveBeenCalledWith(["/viewcart"]);  
       
       //if result is false          //change true to false in productsExistInCart in FakeProductService
            //  expect(routeSpy).not.toHaveBeenCalled();
  });
});




export class FakeProductSvc extends AbstractProductService
{
  GetProductsCategoryWise(category: string): Promise<Product[]> {
     var promise=new Promise<Product[]>((res,rej)=>{
           
      if(category==null) rej(-1);
        var ary=[new Product(),new Product()];
        res(ary);  
     });
     return promise;
  }
  GetCategoryList(): Promise<string[]> {
    var promise=new Promise<string[]>((res,rej)=>{
      var ary:string[]=["red","green"];
      res(ary);
    });
    return promise;
  }
  addToCart(productId: number): void {
    
  }
  ViewCart(): Promise<CartProducts[]> {
    var promise=new Promise<CartProducts[]>((res,rej)=>{
      var ary:CartProducts[]=[
        new CartProducts(),
        new CartProducts()
      ];
      res(ary);
    });
    return promise
  }
  RemoveProductFromCart(productId: number): void {
    
  }
  placeOrder(): Promise<CustomerOrderDetails> {
    var promise=new Promise<CustomerOrderDetails>((res,rej)=>{
    var obj= new CustomerOrderDetails();
      res(obj);
    });
    return promise
  }
  saveOrderDetailsToSession(orderDetails: CustomerOrderDetails): void {
  }
  saveCartProductsToSession(products: CartProducts[]): void {
  }
  generateInvoice(): InvoiceData 
  { 
    return new InvoiceData();
  }
  productsExistInCart(): boolean 
  {
          return true;    
         // return false;
  }
}

