import { test, expect } from '@playwright/test';

test('Feature grid visual fidelity and hover interactions', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check for the feature grid
  const featureGrid = page.locator('div.featureGrid');
  await expect(featureGrid).toBeVisible();

  // Check for the feature cards
  const featureCards = featureGrid.locator('div.featureCard');
  await expect(featureCards).toHaveCount(3);

  // Check for hover effect on the first card
  const firstCard = featureCards.first();
  await firstCard.hover();
  // Add assertion for the expected hover effect
});
