import { browser } from 'protractor';
import { ProductPageTests } from './productcomponent.po';

//ALL TESTS ARE SUCCESSFULLY RUNNING AND PASSED

describe('testing product page to get products category wise', () => {
    let page: ProductPageTests;
  
    beforeEach(() => {
      page = new ProductPageTests();
    });
 
    it('open the product page',async() => {
      await page.OpenProductPage();   
    });
    it('select a category from dropdows', async() => {
        await page.SelectCategory();
    });
    it('check that for the selected category products are displayed', async() => {
       var result=await page.GetTableRows();
       expect(result).toEqual(2);
    });

    it('clicking viewcart button should display alert(empty cart)',async()=>{
           var result=await page.ShowAlertNoProductInCart();
           expect(result).toEqual('No Product in cart..');
    });
   //----------
   
   it('add first product to cart',()=>
    {
        page.AddFirstProductToCart();
    });
    it('check that added product exists in cart',async()=>
    {
       page.ViewCart();
      var count=await page.ProductExistInCart();
      expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+ 'viewcart');
      expect(count).toEqual(1);
    });

    it('now remove products from cart',async()=>
    {
      page.RemoveProductFromCart();
      var count:number=await page.AfterRemovalNoProductExistInCart();
      expect(count).toEqual(0);

    });
});


