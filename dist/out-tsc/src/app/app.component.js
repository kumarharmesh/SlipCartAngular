import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.title = 'SlipCartAngular';
    }
    getSessionId() {
        var result = sessionStorage.getItem("customerId") == null;
        return !result;
    }
    clearSession() {
        this.service.clearSession();
        this.router.navigate(['/']);
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map