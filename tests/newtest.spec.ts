import { test, expect } from '@playwright/test';

test('Login with valid user credentials', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('firstname.lastname@yopmail.com');
   await page.getByRole('textbox', { name: 'Password' }).fill('Test@12345');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.locator('#top-links').getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('heading', { name: 'Account Logout' }).click();
  });

test('Login with invalid user credentials', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(generateEmail());
   await page.getByRole('textbox', { name: 'Password' }).fill('Test@12345');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator(".alert")).toContainText('Warning: No match for E-Mail Address and/or Password.');
}); 


test('Login with out entering user credentials', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator(".alert")).toContainText('Warning: No match for E-Mail Address and/or Password.');
}); 

test('Login with Valid username and invalid password user credentials', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('firstname.lastname@yopmail.com');
   await page.getByRole('textbox', { name: 'Password' }).fill('InvalidPassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator(".alert")).toContainText('Warning: No match for E-Mail Address and/or Password.');
}); 

test('Login with invalid username and valid password  user credentials', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(generateEmail());
   await page.getByRole('textbox', { name: 'Password' }).fill('Test@12345');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator(".alert")).toContainText('Warning: No match for E-Mail Address and/or Password.');
}); 


  export function generateEmail(): string {
  const timestamp = Date.now();
  return `firstname.lastname+${timestamp}@yopmail.com`;
}