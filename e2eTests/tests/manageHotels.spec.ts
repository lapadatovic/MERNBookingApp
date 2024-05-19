import { test, expect } from '@playwright/test';
import exp from 'constants';
import path from 'path';

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

test('Should allow user to add a hotel',async ({page}) => {
   
    await page.goto(`${UI_URL}/add-hotel`);

    await expect(page.getByRole('heading', {name:'Add Hotel'})).toBeVisible();

    await page.locator('[name="name"]').fill("TestHotel");
    await page.locator('[name="city"]').fill("TestCity");
    await page.locator('[name="country"]').fill("TestCountry");
    await page.locator('[name="description"]').fill("TestDesciprt for hotel test test test");
    await page.locator('[name="pricePerNight"]').fill('211');

    await page.selectOption('select[name="starRating"]', "4");

    await page.getByText('Luxury').click();

    await page.getByLabel('Free Wifi').check();
    await page.getByLabel('Parking').check();

    await page.locator('[name = "adultCount"]').fill('13');
    await page.locator('[name = "childCount"]').fill('5'); 

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, 'files', '1.jpg'), 
        path.join(__dirname, 'files', '2.jpg')]
    )

    // await page.getByRole('button', {name: "Save"}).click();

    await page.getByRole('button', {name: "Save"}).click();

    await expect(page.getByText('Hotel Saved')).toBeVisible({ timeout: 20000 });

});