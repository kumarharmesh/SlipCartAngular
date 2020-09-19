import {  Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './AppModels';
import { Observable } from 'rxjs';


export abstract class AbstractCustomerService{
 abstract ValidateCustomer(email:string,password:string):Promise<number>;
  abstract checkLoginStatus():boolean;
  abstract clearSession():void;
}
@Injectable()
export class CustomerService implements AbstractCustomerService
{
    cl:HttpClient;
    constructor(private client:HttpClient ){ this.cl=client;}
     ValidateCustomer(email:string,password:string):Promise<number>{
    try{
            var url="http://localhost:5000/api/Customer/ValidateCustomer";
            var options={headers:new HttpHeaders({'Content-Type':'application/json'})};
            var customer=new Customer();
            customer.email=email;
            customer.password=password;
            var r= this.client.post<number>(url,customer,options).toPromise();
            return r;
       }
        catch(e)
        {
              console.log(`CustomerService Error: ${e.message}`);
              throw e;
        }
    }
    checkLoginStatus():boolean
    {
      var result:boolean=sessionStorage.getItem("customerId")==null;
      return !result;
    }
    clearSession():void
    {
      sessionStorage.clear();
    }
}