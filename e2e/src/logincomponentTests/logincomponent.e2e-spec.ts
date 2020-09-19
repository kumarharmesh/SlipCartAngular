import { LoginPageTests } from "./logincomponent.po";
import { browser } from 'protractor';

//ALL TESTS RUNNING SUCCESSFULLY AND PASSED

describe('testing login page with missing credentials', () => {
    let page: LoginPageTests;
  
    beforeEach(() => {
      page = new LoginPageTests();
    });
  
    it('open the login page', async() => {
      await page.OpenLoginPage();
    });
    it('click login button without entering credentials', async() => {
        await page.EnterNoCredentials();
    });
    it('check the error messages displayed (EMail,Password required)', async() => {
       var result= await page.GetMessage();
        expect(result[0]).toEqual('EMail is required');
        expect(result[1]).toEqual('Password is required');
    });
});




describe('testing login page with invalid credentials', () => {
    let page: LoginPageTests;
  
    beforeEach(() => {
      page = new LoginPageTests();
    });
  
    it('open the login page', async() => {
      await page.OpenLoginPage();
    });
    it('click login button after entering invalid credentials', async() => {
        await page.EnterCredentials('abc@gmail.com','111');
    });
    it('check the error messages displayed (EMail,Password required)', async() => {
       var result= await page.GetMessage();
        expect(result[0]).toEqual('Invalid Email or password..');
    });
});


describe('testing login page with valid credentials', () => {
    let page: LoginPageTests;
  
    beforeEach(() => {
      page = new LoginPageTests();
    });
  
    it('open the login page', async() => {
      await page.OpenLoginPage();
    });
    it('click login button after entering valid credentials', async() => {
        await page.EnterCredentials('gita@gmail.com','123');
    });
    it('you should move to the home page', async() => {
        expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl);
    });
});

