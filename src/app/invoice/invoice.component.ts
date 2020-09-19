import { Component, OnInit } from '@angular/core';
import { AbstractProductService } from '../Models/ProductService';
import { InvoiceData } from '../Models/AppModels';
import { AbstractCustomerService } from '../Models/CustomerService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit
{
  invoiceData:InvoiceData;
  error:string;
  constructor(private service:AbstractProductService,private svc:AbstractCustomerService,private router:Router) 
  {}
    ngOnInit(){
    var isLoggedInUser:boolean=this.svc.checkLoginStatus();
      if(isLoggedInUser==true)
      {
              this.service.placeOrder().
            then(d=> {
              this.service.saveOrderDetailsToSession(d);
              this.invoiceData=this.service.generateInvoice();   
            }).
          catch(e=>this.error=e);
      }
      else
      {
                  this.router.navigate(['/']);
      }
  }
}
