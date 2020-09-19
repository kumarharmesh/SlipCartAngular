import { Component } from '@angular/core';
import { AbstractCustomerService } from './Models/CustomerService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SlipCartAngular';

  
  constructor(private service:AbstractCustomerService,private router:Router)
  {
    
  }
  getSessionId():boolean{
    var result:boolean= sessionStorage.getItem("customerId")==null;
    return !result;
  }
  clearSession():void
  {
       this.service.clearSession();
       this.router.navigate(['/']);
  }
}
