import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login_page';
import { Config } from '@framework/configuration/configuration_helper';

test.describe('authorization test suite', () => {
    test('authorization happy path', async ({ page }) => { 
    //Arrange 
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    //Act 
    const securePage = await loginPage.loginViaUI(
        Config.USERNAME,
        Config.PASSWORD
    ); 
    
    //Assert 
    await expect(securePage.welcomeMessage).toContainText(
        'Welcome to the Secure Area. When you are done click logout below.'
    ); 
    await expect(page).toHaveURL(securePage.url);
});

test('authorization invalid password', async ({ page }) => { 
    //Arrange 
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    //Act 
    await loginPage.loginViaUI(
        Config.USERNAME,
        'incorrectPassword!'
    ); 
    
    //Assert 
    await expect(loginPage.errorFlash).toContainText(
        'Your password is invalid!'
    ); 
    await expect(page).toHaveURL(loginPage.url);
});

});