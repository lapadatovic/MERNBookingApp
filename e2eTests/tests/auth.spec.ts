import { test, expect } from '@playwright/test';

const UI_URL= 'http://localhost:5173';

test('Should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  //get sign in button
  await page.getByRole('link', {name: "Sign in"}).click();

  // 
  await expect(page.getByRole('heading', {name: "Sign in"})).toBeVisible();

  await page.locator('[name=email]').fill('test123@gmail.com')
  await page.locator('[name=password]').fill('123456');

  await page.getByRole('button', {name: "Sign In"}).click();

  await expect(page.getByText('Sign In Successfully!')).toBeVisible();
  await expect(page.getByRole('link', {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole('link', {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole('button', {name: "Sign Out"})).toBeVisible();
});



test('Should allow the user to register', async ({ page }) => {

  const testEmail = `test_register_${Math.floor(Math.random() * 9000) + 1000}@test.com`;
  
  await page.goto(UI_URL);


  //get sign in button
  await page.getByRole('link', {name: "Sign in"}).click();
  // click at Create an accound here - link
  await page.getByRole('link', {name: 'Create an account here'}).click();

  await page.locator('[name=firstName]').fill("Danijel");
  await page.locator('[name=lastName]').fill("Lapsier");
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill("123456");
  await page.locator('[name=confirmPassword]').fill("123456");

  await expect( page.getByRole('heading', {name: 'Create an Account'})).toBeVisible();
  await page.getByRole('button', {name: 'Create Account'}).click();

  await expect(page.getByText('Registration Success')).toBeVisible();
  await expect(page.getByRole('link', {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole('link', {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole('button', {name: "Sign Out"})).toBeVisible();
})