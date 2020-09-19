import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ViewCartComponent = class ViewCartComponent {
    constructor(service, router, customerService) {
        this.service = service;
        this.router = router;
        this.customerService = customerService;
        this.quantityRange = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.ViewCart();
    }
    ViewCart() {
        this.service.ViewCart().then(p => this.products = p).catch(e => this.error = e);
    }
    removeFromCart(productId) {
        this.service.RemoveProductFromCart(productId);
        this.ViewCart();
    }
    placeOrder() {
        var isLoggedInUser;
        if (this.service.productsExistInCart() == false) {
            alert('Cart is empty. Redirecting to Product page..');
            this.router.navigate(['/']);
        }
        else {
            isLoggedInUser = this.customerService.checkLoginStaus();
            this.service.saveCartProductsToSession(this.products);
            if (isLoggedInUser == true) {
                this.router.navigate(['/invoice']);
            }
            else {
                this.router.navigate(['/login']);
            }
        }
    }
};
ViewCartComponent = tslib_1.__decorate([
    Component({
        selector: 'app-view-cart',
        templateUrl: './view-cart.component.html',
        styleUrls: ['./view-cart.component.css']
    })
], ViewCartComponent);
export { ViewCartComponent };
//# sourceMappingURL=view-cart.component.js.map