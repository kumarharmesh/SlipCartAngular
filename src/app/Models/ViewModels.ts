import { FormControl, FormGroup, Validators } from "@angular/forms";

export class CustomerLoginViewModel
{
   EMail:FormControl;
   Password:FormControl;
   LoginGroup:FormGroup;

   constructor()
   {
       this.EMail=new FormControl("",Validators.compose([Validators.email,Validators.required]));
       this.Password=new FormControl("",Validators.compose([Validators.required]));
       this.LoginGroup=new FormGroup({EMail:this.EMail,Password:this.Password});
   }
   Errors():string[]
   {
       var errMessages:string[]=[];
       for(var name in this.LoginGroup.controls)
        {
            for(var err in this.LoginGroup.controls[name].errors)
            {
                switch(err)
                {
                    case 'email': errMessages.push(`${name} is invalid`); break;
                    case 'required': errMessages.push(`${name} is required`); break;
                }
            }
        }
        return errMessages;
   }
}

export class CartProducts{
                         productId:number;
                         title:string;
                         price :number;
                         quantity :number;
                         category:string;
                         expiry: Date;
                         photo :string
    }

