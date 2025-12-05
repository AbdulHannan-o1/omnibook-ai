import { test, expect } from '@playwright/test';

test('About section content and presence', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check for the about section
  const aboutSection = page.locator('section.aboutSection');
  await expect(aboutSection).toBeVisible();

  // Check for the title
  await expect(aboutSection.locator('h2:has-text("About the Book")')).toBeVisible();
});
