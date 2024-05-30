import { test, expect } from '@playwright/test';
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


test("Should display hotels" , async ({page}) => {
    // await page.getByRole('link', {name: 'My Hotels'}).click();
    await page.goto(`${UI_URL}/my-hotels`);

    await expect(page.getByRole('heading', {name: 'My Hotels'})).toBeVisible();
    await expect(page.getByText('Dublin Getaways')).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
    await expect(page.getByText('Dublin, Ireland')).toBeVisible();
    await expect(page.getByText('All Inclusive')).toBeVisible();
    await expect(page.getByText('$119 per night')).toBeVisible();
    await expect(page.getByText('2 adults, 3 children')).toBeVisible();
    await expect(page.getByText('5 Star Rating')).toBeVisible();
    
    await expect(page.getByRole('link', {name: 'View Details'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Add Hotel'})).toBeVisible();
});

test("Should edit hotel", async ({page}) => {
    await page.goto(`${UI_URL}/my-hotels`);
    await expect(page.getByRole('heading', {name: 'My Hotels'})).toBeVisible();
    
    await page.getByRole('link', {name: 'View Details'}).click();
    await expect(page.getByRole('heading', {name: 'Add Hotel'})).toBeVisible();
   
    await page.waitForSelector('[name= "name"]', {state:'attached'})
    await expect(page.locator('[name= "name"]')).toHaveValue('Dublin Getaways');
    await page.locator('[name= "name"]').fill('Dublin Getaways UPDATED');
    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText('Hotel Saved')).toBeVisible();
});