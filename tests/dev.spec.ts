import { test, expect } from '@playwright/test';

test('fixture post renders with the on-this-page nav, and A+ grows the body text', async ({ page }) => {
  await page.goto('/writing/_fixture/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const toc = page.getByRole('navigation', { name: 'On this page' });
  await expect(toc.getByRole('link')).toHaveCount(3);
  const size = () => page.locator('#post-body').evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  const before = await size();
  await page.getByRole('button', { name: 'Larger text' }).click();
  expect(await size()).toBeGreaterThan(before);
  await page.reload();
  expect(await size()).toBeGreaterThan(before);
});
