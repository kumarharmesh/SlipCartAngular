import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { InvoiceComponent } from './invoice/invoice.component';
const routes = [];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot([
                { path: '', component: ProductComponent, pathMatch: "full" },
                { path: 'login', component: LoginComponent },
                { path: "viewcart", component: ViewCartComponent },
                { path: 'invoice', component: InvoiceComponent }
            ])],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map