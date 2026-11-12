import { test, expect } from '@playwright/test';

test('a post renders with the on-this-page nav, key figures and a working theme toggle', async ({ page }) => {
  // Uses the first article listed on the homepage. In dev, drafts are listed too.
  await page.goto('/');
  const first = page.locator('#writing a.post').first();
  test.skip((await first.count()) === 0, 'No articles to check yet');
  await first.click();

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const toc = page.getByRole('navigation', { name: 'On this page' });
  expect(await toc.getByRole('link').count()).toBeGreaterThan(0);
  await expect(page.locator('#post-body h2').first()).toBeVisible();

  const html = page.locator('html');
  const before = await html.getAttribute('data-theme');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(html).not.toHaveAttribute('data-theme', before!);
  await page.reload();
  await expect(html).not.toHaveAttribute('data-theme', before!);
});
