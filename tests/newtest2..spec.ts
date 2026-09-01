import { test, expect } from '@playwright/test';

test('Search with empty query', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.locator('#search').getByRole('button').click();
  await expect(page.locator("h2+p")).toHaveText('There is no product that matches the search criteria.');
});

test('Search with valid Product', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.locator('#search').getByRole('textbox').fill('HP');   
  await page.locator('#search').getByRole('button').click();
  await expect(page.locator("//a[text()='HP LP3065']")).toBeVisible();
});

test('Search with invalid Product', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await page.locator('#search').getByRole('textbox').fill('InvalidProduct');   
  await page.locator('#search').getByRole('button').click();
  await expect(page.locator("h2+p")).toHaveText('There is no product that matches the search criteria.');
});