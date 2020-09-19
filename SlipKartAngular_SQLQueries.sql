--create database SlipKartAngularDb

use SlipKartAngularDb
/*
create table Product(ProductId int identity(500,1)primary key,
					 Title varchar(30),
					 Price money,
					 Quantity int,
					 Category varchar(20),
					 Expiry date,
					 Photo varchar(30))

create table Customer(CustomerId int identity(100,1)primary key,
					 [Name] varchar(30),
					 ContactNo varchar(15),
					 Email varchar(25),
					 [Password] varchar(20))
					 
					 
create table Orders(OrderId int identity(300,1)primary key,
					 CustomerId int,
					 OrderDate date,
					 Amount money)

create table OrderDetails(Id int identity(1,1)primary key,
					OrderId int foreign key references Orders(OrderId),
					CustomerId int foreign key references Customer(CustomerId) ,
					ProductId int foreign key references Product(ProductId),
					Quantity int,
					Price money)

*/

--***********procedure to get current identity value for a table************
create proc CurrentIdentityValueProc @tablename varchar(20)
as
begin
   declare @val int
   select @val=ident_current(@tablename)
   return @val
end


go







