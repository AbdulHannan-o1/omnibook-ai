import { test, expect } from '@playwright/test';

test('Call to Action button hover effect and Footer content', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check for the Call to Action title
  await expect(page.locator('h2:has-text("Ready to explore the future?")')).toBeVisible();

  // Check for the "Start Reading Now" button
  const ctaButton = page.locator('button:has-text("Start Reading Now")');
  await expect(ctaButton).toBeVisible();

  // Check for Footer content
  await expect(page.locator('footer')).toContainText('OmniBook AI');
});
