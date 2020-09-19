import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Customer } from './AppModels';
export class AbstractCustomerService {
}
let CustomerService = class CustomerService {
    constructor(client) {
        this.client = client;
    }
    ValidateCustomer(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var url = "http://localhost:5000/api/Customer/ValidateCustomer";
            var options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
            var customer = new Customer();
            customer.email = email;
            customer.password = password;
            return yield this.client.post(url, customer, options).toPromise();
        });
    }
    checkLoginStaus() {
        var result = sessionStorage.getItem("customerId") == null;
        return !result;
    }
    clearSession() {
        sessionStorage.clear();
    }
};
CustomerService = tslib_1.__decorate([
    Injectable()
], CustomerService);
export { CustomerService };
//# sourceMappingURL=CustomerService.js.map