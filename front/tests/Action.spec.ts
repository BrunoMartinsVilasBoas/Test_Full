import { test, expect } from '@playwright/test';

const TEST_USER = 'BrunoMartinsVilasBoas';
const TEST_USER_ID = '240027996';

test.describe('User actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Search for a user' }).fill(TEST_USER);
  });

  test('Duplicate a user', async ({ page }) => {
    await page.getByRole('img', { name: 'Edit' }).click();
    await page.getByRole('checkbox').check();
    await page.getByRole('img', { name: 'Duplicate' }).click();

    await expect(page.getByText(TEST_USER_ID)).toHaveCount(2);
  });

  test('Delete a user', async ({ page }) => {
    await page.getByRole('img', { name: 'Edit' }).click();
    await page.getByRole('checkbox').check();
    await page.getByRole('img', { name: 'Delete' }).click();

    await expect(page.getByText(TEST_USER_ID)).toHaveCount(0);
  });

  test('Select all users', async ({ page }) => {
    await page.getByRole('img', { name: 'Edit' }).click();
    await page.getByRole('checkbox').check();

    await expect(page.getByText('1elements selected')).toBeVisible();
  });
});
