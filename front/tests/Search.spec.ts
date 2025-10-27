import { test, expect } from '@playwright/test';

const SEARCH_INPUT = 'Search for a user';

test.describe('User search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Check if the loading is visible', async ({ page }) => {
    await page.getByRole('textbox', { name: SEARCH_INPUT }).fill('test');

    await expect(page.getByText('Loading...')).toBeVisible();
  });

  test('Search for a user', async ({ page }) => {
    await page.getByRole('textbox', { name: SEARCH_INPUT }).fill('test');

    await expect(page.getByText('383316')).toBeVisible();
  });

  test('User not found', async ({ page }) => {
    await page.getByRole('textbox', { name: SEARCH_INPUT }).fill('tdzadzadazdazdazdazdaz');
    await page.getByText('No results found').click();

    await expect(page.getByText('No results found')).toBeVisible();
  });
});
