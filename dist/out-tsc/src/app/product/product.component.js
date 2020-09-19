import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ProductComponent = class ProductComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.btnText = "--Select a Category--";
        this.service.GetCategoryList().then(c => this.categories = c).catch(e => this.error = e.message);
        ;
    }
    GetProductsCategoryWise(category) {
        this.btnText = category;
        this.service.GetProductsCategoryWise(category).then(p => this.products = p).catch(e => this.error = e.message);
    }
    addToCart(productId) {
        this.service.addToCart(productId);
    }
    productsExistInCart() {
        var exists = this.service.productsExistInCart();
        if (!exists) {
            alert("No Product in cart..");
        }
        else {
            this.router.navigate(["/viewcart"]);
        }
    }
};
ProductComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product',
        templateUrl: './product.component.html',
        styleUrls: ['./product.component.css']
    })
], ProductComponent);
export { ProductComponent };
//# sourceMappingURL=product.component.js.map