import { Injectable } from '@angular/core';
import { CustomerOrderDetails, InvoiceData, Product } from './AppModels';
import { AbstractCustomerService } from './CustomerService';
import { AbstractProductService } from './ProductService';
import { CartProducts } from './ViewModels';

@Injectable()
export class FakeCustomerService extends AbstractCustomerService
{
  ValidateCustomer(email: string, password: string): Promise<number> 
  {
        return Promise.resolve(100);
  }
  checkLoginStatus():boolean{ return true;}
  clearSession(): void {}
}

@Injectable()
export class FakeProductService extends AbstractProductService
{
  GetProductsCategoryWise(category: string): Promise<Product[]> {
    return Promise.resolve([new Product(),new Product()]);
  }
  GetCategoryList(): Promise<string[]> {
    return Promise.resolve(["one","two"]);
  }
  addToCart(productId: number): void {}
  ViewCart(): Promise<CartProducts[]> {
    return Promise.resolve([new CartProducts(),new CartProducts()]);
  }
  RemoveProductFromCart(productId: number): void {}
  placeOrder(): Promise<CustomerOrderDetails> {
    return Promise.resolve(new CustomerOrderDetails());
  }
  saveOrderDetailsToSession(orderDetails: CustomerOrderDetails): void {}
    
  saveCartProductsToSession(products: CartProducts[]): void {}
    
  generateInvoice(): InvoiceData {
      var obj= new InvoiceData();
      obj.products=[new CartProducts(),new CartProducts()];
      return obj;
    }
  productsExistInCart(): boolean { return true;}
  
}