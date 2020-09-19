import { Product, CustomerOrderDetails, CustomerOrder, OrderDetails, InvoiceData } from './AppModels';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProducts } from './ViewModels';

export abstract class AbstractProductService
{
   async abstract GetProductsCategoryWise(category:string):Promise<Product[]>;
   async abstract GetCategoryList():Promise<string[]>;
   abstract addToCart(productId:number):void;
   async abstract  ViewCart():Promise<CartProducts[]>;
   abstract  RemoveProductFromCart(productId:number):void;
   async abstract  placeOrder():Promise<CustomerOrderDetails>;
   abstract saveOrderDetailsToSession(orderDetails:CustomerOrderDetails):void
   abstract saveCartProductsToSession(products:CartProducts[]):void;
   abstract generateInvoice():InvoiceData;
   abstract productsExistInCart():boolean;
}
@Injectable()
export class ProductService implements AbstractProductService
{
    constructor(private client:HttpClient){   }
    
   async GetProductsCategoryWise(category:string):Promise<Product[]>
   {
        var url=`http://localhost:5000/Products/${category}`;
        return await this.client.get<Product[]>(url).toPromise();
   }

    async GetCategoryList():Promise<string[]>{
        var url='http://localhost:5000/Categories';
        return await this.client.get<string[]>(url).toPromise();

    }
  addToCart(productId:number):void
  {
       var products=sessionStorage.getItem("selectedProducts");
       if(products==null)
       {
            sessionStorage.setItem("selectedProducts",JSON.stringify([productId]));
       }
       else
       {
            var ary=JSON.parse(products);
            ary.push(productId);
            sessionStorage.setItem("selectedProducts",JSON.stringify(ary));
       }
  }
  async ViewCart():Promise<CartProducts[]>
  {
    var products=sessionStorage.getItem("selectedProducts");
    var ary=JSON.parse(products);
    var url="http://localhost:5000/CartProducts";
    var options={
        headers:new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.client.post<CartProducts[]>(url,ary,options).toPromise();
  }
  RemoveProductFromCart(productId:number):void{
     var products=sessionStorage.getItem("selectedProducts");
     var index,productArray:number[];
     if(products !=null)
     {
          productArray=JSON.parse(products);
          index=productArray.indexOf(productId);
          productArray.splice(index,1);
          if(productArray.length==0)
          sessionStorage.setItem("selectedProducts",'[]');
          else
            sessionStorage.setItem("selectedProducts",JSON.stringify(productArray));
     }
  }
  saveCartProductsToSession(products:CartProducts[]):void
  {
      sessionStorage.setItem("products",JSON.stringify(products));
  }
  async placeOrder():Promise<CustomerOrderDetails>
  {

     var url="http://localhost:5000/PlaceOrder";
     var options={headers:new HttpHeaders({'Content-Type':'application/json'})};
     var data:CustomerOrder=new CustomerOrder();
     data.customerId=parseInt(sessionStorage.getItem("customerId"));
     data.orderedProducts=<any> JSON.parse(sessionStorage.getItem("products"));
     return this.client.post<CustomerOrderDetails>(url,data,options).toPromise();
  }
  
  saveOrderDetailsToSession(orderDetails:CustomerOrderDetails):void
  {
     sessionStorage.setItem("orderDetails",JSON.stringify(orderDetails));
  }
  generateInvoice():InvoiceData
  {
    var orderDetails:CustomerOrderDetails= JSON.parse(sessionStorage.getItem("orderDetails"));
    var products:CartProducts[]=JSON.parse(sessionStorage.getItem("products"));

    var invoiceData:InvoiceData=new InvoiceData();
    invoiceData.products=products;
    invoiceData.customerOrderDetails=orderDetails;

    return invoiceData;
  }
  productsExistInCart():boolean
  {
     var products=sessionStorage.getItem("selectedProducts");
     var temp=JSON.parse(products);
     return products==null || temp.length==0? false:true;
  }
}

