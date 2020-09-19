import { Component } from '@angular/core';
import { CustomerLoginViewModel } from '../Models/ViewModels';
import { AbstractCustomerService } from '../Models/CustomerService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error:string;
  customer:CustomerLoginViewModel;
  errorMessages:string[];
  constructor(private service:AbstractCustomerService,private router:Router) 
  {
    this.errorMessages=[];
    this.customer=new CustomerLoginViewModel();
    this.service=service;
   }
  submitForm():void
  {
   var result:Promise<number>;
    
    this.errorMessages=[];
    this.errorMessages=this.customer.Errors();     
    if(this.customer.LoginGroup.invalid) return;
    var result= this.service.ValidateCustomer(this.customer.EMail.value,this.customer.Password.value);
    result.then(c=>this.saveCustomerIdToSession(c)).catch(e=>this.errorMessages.push(e.message)); // for mocking error use ==> e.error.type
   }
  saveCustomerIdToSession(id:number):void
  { 
    if(id==-1)
         {

             this.errorMessages.push('Invalid Email or password..');
         }
         else
         {
           sessionStorage.setItem('customerId',id.toString());
           if(sessionStorage.getItem("products")!=null)
           {
            this.router.navigate(['/invoice']);
           }
           else
           {
            this.router.navigate(['/']);
           }
         }
  }
}
