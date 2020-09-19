import { async,TestBed,inject, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import{HttpClientTestingModule,HttpTestingController} from'@angular/common/http/testing';
import { CustomerService, AbstractCustomerService } from '../Models/CustomerService';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../Models/AppModels';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ProductComponent } from '../product/product.component';
import { ViewCartComponent } from '../view-cart/view-cart.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { Route } from '@angular/compiler/src/core';
import {RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { exception } from 'console';

describe('Customer Service test',()=>{
    let component:LoginComponent;
    let fixture:ComponentFixture<LoginComponent>;
    let svc:CustomerService;
    let router:Router;
    var routeSpy;
    beforeEach((async()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientModule,ReactiveFormsModule,FormsModule,AppRoutingModule],
            declarations:[LoginComponent,ProductComponent,ViewCartComponent,InvoiceComponent],
            providers:[{ provide:AbstractCustomerService,useClass:CustomerService}]
        }).compileComponents();
    }));
    //use RouterTestingModule from '@angular/router/testing' in imports then no need to use
    //ProductComponent,ViewCartComponent,InvoiceComponent in 'declarations'
    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance; 
        router=TestBed.get(Router);
        fixture.detectChanges();
       routeSpy=spyOn(router,'navigate');
      });
    it('check the validity of user credentials==>In Service Class',async()=>{
        
        svc=TestBed.get(AbstractCustomerService);
        var r=await svc.ValidateCustomer("gita@gmail.com","123");
        expect(r).toEqual(101); 
       
        r=await svc.ValidateCustomer("temp@gmail.com","12345");
        expect(r).toEqual(-1); 
    });

    it('Testing LoginComponent SubmitFormFunction()==> Valid Credentials',(done)=>{

   
        component.customer.EMail.setValue("gita@gmail.com");
        component.customer.Password.setValue("123");
        
        expect(component.customer.LoginGroup.valid).toBeTruthy();
        sessionStorage.clear();
        component.submitForm();

        
        setTimeout(()=>{
            expect(component.errorMessages.length).toEqual(0);
            expect(routeSpy).toHaveBeenCalledWith(['/']);
            done();
        },400);
    });
    it('Testing LoginComponent SubmitFormFunction()==> Invalid email',(done)=>{

        component.customer.EMail.setValue("gitagmail.com");
        component.customer.Password.setValue("123");
        expect(component.customer.LoginGroup.invalid).toBeTruthy();

        component.submitForm();

        setTimeout(()=>{
            expect(component.errorMessages.length).not.toEqual(0);
            expect(component.errorMessages[0]).toEqual('EMail is invalid');
            done();
        },400);
    });
    it('Testing LoginComponent SubmitFormFunction()==> Invalid User',(done)=>{

        component.customer.EMail.setValue("nouser@gmail.com");
        component.customer.Password.setValue("123");
        expect(component.customer.LoginGroup.valid).toBeTruthy();

        component.submitForm();
        setTimeout(()=>{
            expect(component.errorMessages.length).not.toEqual(0);
            expect(component.errorMessages[0]).toEqual('Invalid Email or password..');
            done();
        },200);
    });
    it('Testing LoginComponent SubmitFormFunction()==> User Logging in after adding products in cart',(done)=>{

        component.customer.EMail.setValue("gita@gmail.com");
        component.customer.Password.setValue("123");
        expect(component.customer.LoginGroup.valid).toBeTruthy();

        
      //  var routeSpy=spyOn(router,"navigate");
        sessionStorage.setItem("products",JSON.stringify({pid:1,title:'pen'}));
        component.submitForm();
        setTimeout(()=>{
            expect(component.errorMessages.length).toEqual(0);
            expect(routeSpy).toHaveBeenCalledWith(['/invoice']);
            sessionStorage.removeItem('products');
            done();
        },400);
    });
});

//~~~~~~~~~~~~~~~~~~~~~~Login Tests Mocking Http and Routing~~~~~~~~~~~~~~~~~~~
describe('Login Tests Mocking Http and Routing',()=>{
    let component:LoginComponent;
    let fixture:ComponentFixture<LoginComponent>;
    let router:Router;
    let routeSpy;
    let controller:HttpTestingController;
    let svc:AbstractCustomerService;
    beforeEach((async()=>{
        TestBed.configureTestingModule({
        imports:[ReactiveFormsModule,FormsModule, HttpClientTestingModule,RouterTestingModule],
        declarations:[LoginComponent],
        providers:[{provide:AbstractCustomerService,useClass:CustomerService}]
        }).compileComponents();
    }));

    beforeEach(()=>{
        fixture=TestBed.createComponent(LoginComponent);
        component=fixture.componentInstance;
        router=TestBed.get(Router);
        routeSpy=spyOn(router,'navigate');
        fixture.detectChanges();
    });

    it('Login component invalid email test Mocking Http request',(done)=>{
        //submitForm() to be called before calling expectOne()
        controller=TestBed.get(HttpTestingController);
    
         component.customer.EMail.setValue('abc@abc.com');
         component.customer.Password.setValue('123');
         component.submitForm();
         
          var cust={ customerId: 0, name: '', contactNo: '', email: 'abc@abc.com', password: '123' };  
          var mock=controller.expectOne("http://localhost:5000/api/Customer/ValidateCustomer");
         expect(mock.request.responseType).toEqual('json');
         expect(mock.request.body.email).toEqual('abc@abc.com');
         expect(mock.request.body.name).toEqual('');
          mock.flush(-1);
         setTimeout(()=>{
            expect(component.errorMessages[0]).toEqual('Invalid Email or password..');
            done();
         },300);
      controller.verify();
    });
    it('Login component invalid email test',()=>
    {
        controller=TestBed.get(HttpTestingController);
        component.customer.EMail.setValue('abc');
        component.customer.Password.setValue('123');
        component.submitForm();
     
        expect(component.customer.LoginGroup.valid).toBeFalsy();
        
        expect(component.errorMessages[0]).toEqual('EMail is invalid');
    
    });
//------
    it('Valid email id and password mocking request and routing',(done)=>{
        //submitForm() to be called before calling expectOne()
        controller=TestBed.get(HttpTestingController);
        component.customer.EMail.setValue('gita@gmail.com');
        component.customer.Password.setValue('123');
        component.submitForm();
        var mock=controller.expectOne("http://localhost:5000/api/Customer/ValidateCustomer");
       
        mock.flush(101);
        expect(mock.request.body.email).toEqual('gita@gmail.com');
        expect(mock.request.body.password).toEqual('123');
        setTimeout(()=>
        {
           
           expect(sessionStorage.getItem('customerId')).toEqual('101');
           sessionStorage.removeItem('customerId');
           // If session has products ['/invoice'] will be called     
           expect(routeSpy).toHaveBeenCalledWith(['/']);
                done();
        },500);
        
        controller.verify();  
    });
    //-----
    it('Response to an Http Request is ERROR',(done)=>{
        //submitForm() to be called before calling expectOne()
        controller=TestBed.get(HttpTestingController);
        component.customer.EMail.setValue('gita@gmail.com');
        component.customer.Password.setValue('123');
        component.submitForm();
        var mock=controller.expectOne("http://localhost:5000/api/Customer/ValidateCustomer");
       
        mock.error(new ErrorEvent('input exceeded desired length'));
       
        // to get this error message type  'e.error.type' in catch in login.component.ts=> SubmitForm() method   
        expect(mock.request.body.email).toEqual('gita@gmail.com');
        expect(mock.request.body.password).toEqual('123');
        setTimeout(()=>
        {
            expect(component.errorMessages.length).not.toEqual(0);
            done();
        },700);
        
        controller.verify();  
    });
    it('testing Login User Interface',()=>{
            
           //email & pwd both missing
            var btn=fixture.debugElement.query(By.css('input[type=submit]')).nativeElement;
            btn.click();
            fixture.detectChanges();
            var li=fixture.debugElement.query(By.css('li:first-child')).nativeElement;
            expect(li.innerText).toEqual('EMail is required');
          
           //pwd missing
            component.customer.EMail.setValue('abc');
            btn.click();
            fixture.detectChanges();
            
            var li=fixture.debugElement.query(By.css('li:nth-Child(1)')).nativeElement;
            expect(li.innerText).toEqual('EMail is invalid');
            
            li=fixture.debugElement.query(By.css('li:nth-Child(2)')).nativeElement;
            expect(li.innerText).toEqual('Password is required');
            
    });


    it('************testing using fakeasync***********',fakeAsync(()=>{

        controller=TestBed.get(HttpTestingController);
    
        component.customer.EMail.setValue('abc@abc.com');
        component.customer.Password.setValue('123');
        component.submitForm();
        
         var cust={ customerId: 0, name: '', contactNo: '', email: 'abc@abc.com', password: '123' };  
         var mock=controller.expectOne("http://localhost:5000/api/Customer/ValidateCustomer");
        expect(mock.request.responseType).toEqual('json');
        expect(mock.request.body.email).toEqual('abc@abc.com');
        expect(mock.request.body.name).toEqual('');
         mock.flush(-1);
         tick(300); 
           expect(component.errorMessages[0]).toEqual('Invalid Email or password..');
           controller.verify();
    }));
});

