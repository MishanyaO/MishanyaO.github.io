import { test, expect } from '@playwright/test';

test('a post renders with the on-this-page nav, and A+ grows the body text', async ({ page }) => {
  // Uses the first article listed on the homepage. In dev, drafts are listed too.
  await page.goto('/');
  const first = page.locator('#writing h3 a').first();
  test.skip((await first.count()) === 0, 'No articles to check yet');
  await first.click();

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const toc = page.getByRole('navigation', { name: 'On this page' });
  expect(await toc.getByRole('link').count()).toBeGreaterThan(0);
  const size = () => page.locator('#post-body').evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  const before = await size();
  await page.getByRole('button', { name: 'Larger text' }).click();
  expect(await size()).toBeGreaterThan(before);
  await page.reload();
  expect(await size()).toBeGreaterThan(before);
});
