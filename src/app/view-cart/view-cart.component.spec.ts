import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Product, CustomerOrderDetails, InvoiceData } from '../Models/AppModels';
import { AbstractCustomerService, CustomerService } from '../Models/CustomerService';
import { FakeCustomerService } from '../Models/FakeTestingClasses';
import { AbstractProductService, ProductService } from '../Models/ProductService';
import { CartProducts } from '../Models/ViewModels';
import { FakeProductService } from '../Models/FakeTestingClasses';
import { ViewCartComponent } from './view-cart.component';

jasmine.getEnv().allowRespy(true);

describe('ViewCart Component Tests',()=>{
  
  let fixture:ComponentFixture<ViewCartComponent>;
  let component:ViewCartComponent;
  let routeSpy;
  let router:Router;
  
  beforeEach((async()=>{
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,FormsModule],  
      declarations:[ViewCartComponent],
      providers:[{provide:AbstractCustomerService,useClass:FakeCustomerService},
                 {provide:AbstractProductService,useClass:FakeProductService}]
  }).compileComponents();

  }));
  beforeEach(()=>{
    fixture=TestBed.createComponent(ViewCartComponent);
    component=fixture.componentInstance;
    router=TestBed.get(Router);
   
    routeSpy=spyOn(router,"navigate");
    fixture.detectChanges();
});
  it('removeFromCart test',(done)=>{  //it also tests ViewCart() method in ViewCartComponent
      component.removeFromCart(100);
      setTimeout(()=>{
        expect(component.products).not.toBeNull();
        expect(component.products.length).toEqual(2);
        done();
      },400);
  });
  it('PlaceOrder test',()=>{
   
    var productSvc=TestBed.get(AbstractProductService);
    var customerSvc=TestBed.get(AbstractCustomerService);
    spyOn(productSvc,'productsExistInCart').and.returnValue(false);
    component.placeOrder();   
    expect(routeSpy).toHaveBeenCalledWith(['/']); 

    //-------------------------

    spyOn(productSvc,'productsExistInCart').and.returnValue(true);
    spyOn(customerSvc,'checkLoginStatus').and.returnValue(true);
    component.placeOrder(); 
    expect(routeSpy).toHaveBeenCalledWith(['/invoice']);
     
    //----------------------
    spyOn(productSvc,'productsExistInCart').and.returnValue(true);
    spyOn(customerSvc,'checkLoginStatus').and.returnValue(false);
    component.placeOrder(); 
    expect(routeSpy).toHaveBeenCalledWith(['/login']);
});
});
