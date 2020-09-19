import * as tslib_1 from "tslib";
import { CustomerOrder, InvoiceData } from './AppModels';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
export class AbstractProductService {
}
let ProductService = class ProductService {
    constructor(client) {
        this.client = client;
    }
    GetProductsCategoryWise(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var url = `http://localhost:5000/Products/${category}`;
            return yield this.client.get(url).toPromise();
        });
    }
    GetCategoryList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var url = 'http://localhost:5000/Categories';
            return yield this.client.get(url).toPromise();
        });
    }
    addToCart(productId) {
        var products = sessionStorage.getItem("selectedProducts");
        if (products == null) {
            sessionStorage.setItem("selectedProducts", JSON.stringify([productId]));
        }
        else {
            var ary = JSON.parse(products);
            ary.push(productId);
            sessionStorage.setItem("selectedProducts", JSON.stringify(ary));
        }
    }
    ViewCart() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var products = sessionStorage.getItem("selectedProducts");
            var ary = JSON.parse(products);
            var url = "http://localhost:5000/CartProducts";
            var options = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            };
            return this.client.post(url, ary, options).toPromise();
        });
    }
    RemoveProductFromCart(productId) {
        var products = sessionStorage.getItem("selectedProducts");
        var index, productArray;
        if (products != null) {
            productArray = JSON.parse(products);
            index = productArray.indexOf(productId);
            productArray.splice(index, 1);
            if (productArray.length == 0)
                sessionStorage.setItem("selectedProducts", '[]');
            else
                sessionStorage.setItem("selectedProducts", JSON.stringify(productArray));
        }
    }
    saveCartProductsToSession(products) {
        sessionStorage.setItem("products", JSON.stringify(products));
    }
    placeOrder() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var url = "http://localhost:5000/PlaceOrder";
            var options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
            var data = new CustomerOrder();
            data.customerId = parseInt(sessionStorage.getItem("customerId"));
            data.orderedProducts = JSON.parse(sessionStorage.getItem("products"));
            return this.client.post(url, data, options).toPromise();
        });
    }
    saveOrderDetailsToSession(orderDetails) {
        sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    }
    generateInvoice() {
        var orderDetails = JSON.parse(sessionStorage.getItem("orderDetails"));
        var products = JSON.parse(sessionStorage.getItem("products"));
        var invoiceData = new InvoiceData();
        invoiceData.products = products;
        invoiceData.customerOrderDetails = orderDetails;
        return invoiceData;
    }
    productsExistInCart() {
        var products = sessionStorage.getItem("selectedProducts");
        var temp = JSON.parse(products);
        return products == null || temp.length == 0 ? false : true;
    }
};
ProductService = tslib_1.__decorate([
    Injectable()
], ProductService);
export { ProductService };
//# sourceMappingURL=ProductService.js.map