import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CustomerLoginViewModel } from '../Models/ViewModels';
let LoginComponent = class LoginComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.errorMessages = [];
        this.customer = new CustomerLoginViewModel();
        this.service = service;
    }
    submitForm() {
        var result;
        var result = this.service.ValidateCustomer(this.customer.EMail.value, this.customer.Password.value);
        this.errorMessages = [];
        result.then(c => this.saveCustomerIdToSession(c)).catch(e => this.errorMessages.push(e.message));
    }
    saveCustomerIdToSession(id) {
        this.errorMessages = this.customer.Errors();
        if (this.customer.LoginGroup.invalid)
            return;
        if (id == -1) {
            this.errorMessages.push('Invalid Email or password..');
        }
        else {
            sessionStorage.setItem('customerId', id.toString());
            if (sessionStorage.getItem("products") != null) {
                this.router.navigate(['/invoice']);
            }
            else {
                this.router.navigate(['/']);
            }
        }
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map