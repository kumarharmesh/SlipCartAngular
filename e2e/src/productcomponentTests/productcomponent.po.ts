import { browser, element, by, ElementArrayFinder,  } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { TIMEOUT } from 'dns';

export class ProductPageTests
{
  
    public OpenProductPage():Promise<any>
    {
        return browser.get(browser.baseUrl) as Promise<any>;
    }
    public async SelectCategory():Promise<void>
    {
        //NOTE: USE THE FOLLOWING LINE IF RUNNING PRODUCTCOMPONENT TESTS ONLY AS STANDALONE
       // await element(by.css('button')).click();

      //NOTE: USE THE FOLLOWING LINE IF RUNNING LOGINCOMPONENT TESTS AND PRODUCTCOMPONENT TESTS BOTH
        await element(by.className('btn btn-success dropdown-toggle')).click();
      
      
        var div=element(by.className('dropdown-menu dropdown-menu-left show'));
        //var ele=div.element(by.css('a:first-child'));
        var ele=div.element(by.css('a:nth-child(2)'));   //select category='Medicine'
        await ele.click();    
        browser.sleep(500);
    }
    public async GetTableRows():Promise<number>
    {
       // var EC=protractor.ExpectedConditions;
      //  browser.wait(EC.visibilityOf(element(by.css('table tr:first-child'))), 5000, 'Table is not visible');
    
      var rows=element.all(by.css('table tbody tr'));
      var n=0;
      await rows.map(e=>{n++}) ;
      return  n;
    }
    public async ShowAlertNoProductInCart():Promise<string>
    {
         await element(by.className('btn btn-danger')).click();
         var alert=browser.switchTo().alert();
         var result=await alert.getText();
         await alert.dismiss();
        browser.sleep(1000);
        return result;
    }

    public async AddFirstProductToCart()
    {
        await element(by.css('table tr:first-child td:last-child a')).click();
        browser.sleep(1000);
    }
    public async ViewCart()
    {
        await element(by.className('btn btn-danger')).click();
    }
    public async ProductExistInCart()
    {
        browser.sleep(1000);
        var rows=element.all(by.css('table tbody tr'));
        var count=0;
        await rows.map(r=>count++);
        return count;
    }

    public async RemoveProductFromCart():Promise<void>
    {
        var rows=element.all(by.css('table tbody tr td button'));
        await rows.map(e=>{
            browser.sleep(400);
            e.click();
        });
    }
    public async AfterRemovalNoProductExistInCart()
    {
        browser.sleep(500);
        var rows=element.all(by.css('table tbody tr'));
        var count=0;
        await rows.map(r=>count++);
        return count;
    }
}