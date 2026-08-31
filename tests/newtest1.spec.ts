import { test, expect } from '@playwright/test';

test('Customer Registration with all mandatory fields', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: '* First Name' }).fill('Firstname');
  await page.getByRole('textbox', { name: '* Last Name' }).fill('Lastname');
  await page.getByRole('textbox', { name: '* E-Mail' }).fill(generateEmail());
  await page.getByRole('textbox', { name: '* Telephone' }).fill('07521375213');
  await page.getByRole('textbox', { name: '* Password', exact: true }).fill('Test@12345');
  await page.getByRole('textbox', { name: '* Password Confirm' }).fill('Test@12345');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 })).toBeVisible();
});

test('Customer Registration with all fields including optional fields', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: '* First Name' }).fill('Firstname');
  await page.getByRole('textbox', { name: '* Last Name' }).fill('Lastname');
  await page.getByRole('textbox', { name: '* E-Mail' }).fill(generateEmail());
  await page.getByRole('textbox', { name: '* Telephone' }).fill('07521375213');
  await page.getByRole('textbox', { name: '* Password', exact: true }).fill('Test@12345');
  await page.getByRole('textbox', { name: '* Password Confirm' }).fill('Test@12345');
  await page.getByRole('radio', { name: 'Yes', checked: false }).click();
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 })).toBeVisible();
});


test('Customer Registration without entering any field values', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator(".alert")).toContainText('Warning: You must agree to the Privacy Policy!');
  await expect(page.locator("[name=firstname]+div")).toHaveText('First Name must be between 1 and 32 characters!');
  await expect(page.locator("[name=lastname]+div")).toHaveText('Last Name must be between 1 and 32 characters!');
  await expect(page.locator("[name=email]+div")).toHaveText('E-Mail Address does not appear to be valid!');
  await expect(page.locator("[name=telephone]+div")).toHaveText('Telephone must be between 3 and 32 characters!');
  await expect(page.locator("[name=password]+div")).toHaveText('Password must be between 4 and 20 characters!');
});

export function generateEmail(): string {
  const timestamp = Date.now();
  return `firstname.lastname+${timestamp}@yopmail.com`;
}