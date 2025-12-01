import { test, expect } from '@playwright/test';

test('Hero section visual fidelity and CTA click', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check for the main title
  await expect(page.locator('h1:has-text("Physical AI and Humanoid Robotics")')).toBeVisible();

  // Check for the subtitle
  await expect(page.locator('p:has-text("An Interactive Guide to the Future of Embodied Intelligence")')).toBeVisible();

  // Check for the "Start Reading" button and click it
  const startReadingButton = page.locator('button:has-text("Start Reading")');
  await expect(startReadingButton).toBeVisible();
  await startReadingButton.click();
  // Add assertion for the expected navigation or action

  // Check for the "Explore Features" button and click it
  const exploreFeaturesButton = page.locator('button:has-text("Explore Features")');
  await expect(exploreFeaturesButton).toBeVisible();
  await exploreFeaturesButton.click();
  // Add assertion for the expected navigation or action
});
