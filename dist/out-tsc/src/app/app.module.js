import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomerService, AbstractCustomerService } from './Models/CustomerService';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { ProductService, AbstractProductService } from './Models/ProductService';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { InvoiceComponent } from './invoice/invoice.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            LoginComponent,
            ProductComponent,
            ViewCartComponent,
            InvoiceComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule, ReactiveFormsModule, FormsModule,
            HttpClientModule,
        ],
        providers: [{ provide: AbstractCustomerService, useClass: CustomerService },
            { provide: AbstractProductService, useClass: ProductService }],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map