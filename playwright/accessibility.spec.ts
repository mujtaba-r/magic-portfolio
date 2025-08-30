import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/about', '/blog'];

test.describe('A11y checks', () => {
  for (const p of pages) {
    test(`axe check ${p}`, async ({ page }) => {
      const base = process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3000';
      await page.goto(`${base}${p}`);
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
