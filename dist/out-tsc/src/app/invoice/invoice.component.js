import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let InvoiceComponent = class InvoiceComponent {
    constructor(service, svc, router) {
        this.service = service;
        this.svc = svc;
        this.router = router;
        var isLoggedInUser = this.svc.checkLoginStaus();
        if (isLoggedInUser == true) {
            this.service.placeOrder().
                then(d => {
                this.service.saveOrderDetailsToSession(d);
                this.invoiceData = this.service.generateInvoice();
            }).
                catch(e => this.error = e);
        }
        else {
            this.router.navigate(['/']);
        }
    }
};
InvoiceComponent = tslib_1.__decorate([
    Component({
        selector: 'app-invoice',
        templateUrl: './invoice.component.html',
        styleUrls: ['./invoice.component.css']
    })
], InvoiceComponent);
export { InvoiceComponent };
//# sourceMappingURL=invoice.component.js.map