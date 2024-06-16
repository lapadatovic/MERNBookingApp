import { test, expect } from '@playwright/test';

const UI_URL= 'http://localhost:5173';

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    //get sign in button
    await page.getByRole('link', {name: "Sign in"}).click();
  
    await expect(page.getByRole('heading', {name: "Sign in"})).toBeVisible();
  
    await page.locator('[name=email]').fill('test123@gmail.com')
    await page.locator('[name=password]').fill('123456');
  
    await page.getByRole('button', {name: "Sign In"}).click();
  
    await expect(page.getByText('Sign In Successfully!')).toBeVisible();
});

test("Should show hotel serach results", async ({page}) => {
    await page.goto(UI_URL);
    let startDate = '16/06/2024';
    let endDate = '20/06/2024';

    await page.getByPlaceholder('Where are you going?').fill('Dublin');
    await page.getByLabel('Adults:').fill('2');
    await page.getByLabel('Children').fill('1');
    // checkIn date
    await page.getByPlaceholder('Check-in Date').click();
    await page.getByRole('option').getByText('16').click();
    // checkout date
    await page.getByPlaceholder('Check-out Date').click();
    const targetDiv = await page.$('div[aria-label="Choose Friday, June 28th, 2024"]');
    await targetDiv?.click();

    await page.getByRole('button', {name: 'Search'}).click();
    
    await expect(page.getByText('Hotels found in Dublin')).toBeVisible();
    await expect(page.getByRole('link', {name: 'Dublin Getaways'})).toBeVisible();
});
