import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { InvoiceComponent } from './invoice.component';
import {RouterTestingModule}  from '@angular/router/testing';
import { AbstractCustomerService } from '../Models/CustomerService';
import { FakeCustomerService } from '../Models/FakeTestingClasses';
import { AbstractProductService } from '../Models/ProductService';
import { FakeProductService } from '../Models/FakeTestingClasses';
import { Router } from '@angular/router';

describe('InvoiceComponent Tests', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;
  let router:Router;
  let routeSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ InvoiceComponent ],
      providers:[{provide:AbstractProductService,useClass:FakeProductService},
        {provide:AbstractCustomerService,useClass:FakeCustomerService}]
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    router=TestBed.get(Router);
    routeSpy=spyOn(router,'navigate');
  });
  


//Using a spy for checkLoginStatus() that returns false
// Otherwise, without spy, checkLoginStatus()from FakeCustomerService 
//MUST return FALSE FOR THE TEST TO BE SUCCESS
 it('Invoice test (if checkLoginStatus() return FALSE)', () => {
  
    let svc=TestBed.get(AbstractCustomerService);
    spyOn(svc,'checkLoginStatus').and.returnValue(false);
    component.ngOnInit();
      expect(routeSpy).toHaveBeenCalledWith(['/']);
  });


  it('Invoice test (if checkLoginStatus() from FakeCustomerService return TRUE)', fakeAsync(()=>{
     component.ngOnInit();
     tick(400);
     expect(component.invoiceData).not.toBeNull();
     expect(component.invoiceData.products.length).toEqual(2);
  }));
});
