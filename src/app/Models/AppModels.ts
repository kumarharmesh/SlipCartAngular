import { CartProducts } from './ViewModels';

export class Product{
ProductId:number;
					 Title:string;
					 Price :number;
					 Quantity :number;
					 Category:string;
					 Expiry: Date;
					 Photo :string
}
export class Customer
{
    customerId :number;
					 name:string;
					 contactNo :string;
					 email:string;
					 password :string;
	constructor(){
		this.customerId =0;
		this.name="";
		this.contactNo="";
		this.email="";
		this.password="";

	}
}
					 
					 
export class Orders{
    OrderId:number;
					 CustomerId:number;
					 OrderDate:Date;
                     Amount :number
                }

export class OrderDetails{
    Id :number;
					OrderId:number;
					CustomerId :number;
					ProductId :number;
					Quantity :number;
                    Price :number;
}

export class CustomerOrder
{
	customerId:number;
	orderedProducts:Product[];
}
export class CustomerOrderDetails
{
	
	customerName:string;
	customerEMail:string;
	contactNo:string;
	customerId:number;
	orderId:number;
	orderDate:Date;
	amount:number;
}
export class InvoiceData
{
	products:CartProducts[];
	customerOrderDetails:CustomerOrderDetails;
}