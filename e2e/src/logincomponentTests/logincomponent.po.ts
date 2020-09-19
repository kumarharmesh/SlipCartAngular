import { browser, element, by, ElementArrayFinder } from 'protractor';

export class LoginPageTests
{
    public OpenLoginPage():Promise<any>
    {
        return browser.get(browser.baseUrl+'login') as Promise<any>;
    }
    public async EnterNoCredentials():Promise<void>
    {
        var button=element(by.css('input[type=submit]'));
        await button.click();
    }
    public async EnterCredentials(userid:string,passwrd:string):Promise<void>
    {
        var userId=element(by.css('input[type=email]'));
        var password=element(by.css('input[type=password]'));
        
        await userId.sendKeys(userid);
        await password.sendKeys(passwrd);

        var button=element(by.css('input[type=submit]'));
        await button.click();
    }
    public async GetMessage():Promise<string[]>
    {
         var items=element.all(by.css('ul li'));
         var result:string[]=await items.map(e=>e.getText());
          return result;
    }
}