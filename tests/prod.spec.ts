import { test, expect } from '@playwright/test';

test('home renders the headline, stack and contact links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I build construction software end to end');
  await expect(page.getByText('Product Engineer · since 2022')).toBeVisible();
  const panel = page.getByRole('complementary', { name: 'Stack and links' });
  await expect(panel.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/mikhail-olianenko/');
  await expect(panel.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/MishanyaO');
});

test('theme toggle switches and persists after reload', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'light');
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

test('mobile Stack button opens the drawer and Escape closes it', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open stack' }).click();
  await expect(page.getByRole('dialog', { name: 'Stack' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Stack' })).toBeHidden();
});

test('mobile interactive targets are at least 44px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const el of await page.locator('.menu-btn, .theme-btn, .contacts a').all()) {
    const box = await el.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
  }
});
