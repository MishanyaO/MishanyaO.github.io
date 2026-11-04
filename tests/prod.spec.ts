import { test, expect } from '@playwright/test';

test('home renders the headline and the three icon buttons', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Mike Olianenko' })).toBeVisible();
  await expect(page.getByText('Product Engineer · Building software since 2022')).toBeVisible();
  await expect(page.getByRole('link', { name: 'LinkedIn', exact: true }).first()).toBeVisible();
  const row = page.locator('.icons');
  await expect(row.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/mikhail-olianenko/');
  await expect(row.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/MishanyaO');
  await expect(row.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:mikhail.olianenko@gmail.com');
});

test('theme toggle switches and persists after reload', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
});

test('no horizontal scroll at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  expect(sw).toBeLessThanOrEqual(cw);
});

test('shows the empty writing line and generates no writing pages', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByText('Longer pieces coming.')).toBeVisible();
  const res = await request.get('/writing/_fixture/');
  expect(res.status()).toBe(404);
});

test('interactive targets are at least 44px', async ({ page }) => {
  await page.goto('/');
  for (const loc of [page.locator('.nav a'), page.locator('.theme-btn'), page.locator('.icon-btn')]) {
    for (const el of await loc.all()) {
      const box = await el.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.width).toBeGreaterThanOrEqual(44);
    }
  }
});
