
import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // Assuming your Docusaurus site runs on the root
  });

  test('should display the hero section title', async ({ page }) => {
    await expect(page.getByText('PHYSICAL AI & HUMANOID ROBOTICS')).toBeVisible();
  });

  test('should display the hero section subtitle', async ({ page }) => {
    await expect(page.getByText('Explore the frontier of embodied intelligence')).toBeVisible();
  });

  test('should display the "Start Reading Now" button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Start Reading Now' })).toBeVisible();
  });

  test('should navigate to introduction chapter on button click', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Reading Now' }).click();
    // Assuming the first chapter is at /docs/chapter-1-introduction-to-physical-ai-and-humanoid-robotics
    await expect(page).toHaveURL(/.*docs\/chapter-1-introduction-to-physical-ai-and-humanoid-robotics/);
  });
});
