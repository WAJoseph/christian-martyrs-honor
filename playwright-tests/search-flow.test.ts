import { test, expect } from "@playwright/test";

test("2-click search flow", async ({ page }) => {
  // Start from the homepage
  await page.goto("/");

  // Wait for and click the "Explore Their Stories" button
  await page.waitForSelector("text=Explore Their Stories");

  // Click and wait for navigation
  await Promise.all([
    page.waitForNavigation(),
    page.click("text=Explore Their Stories"),
  ]);

  // Verify we're on the gallery page
  await expect(page).toHaveURL("/gallery"); // Wait for the gallery grid to load
  await page.waitForSelector('[data-testid="martyr-grid"]');

  // Click on the first martyr card
  await page.click('[data-testid="martyr-card"]:first-child');

  // Verify we're on a martyr detail page
  await expect(page.url()).toMatch(/\/martyr\/\d+/);

  // Verify key elements of the martyr detail page are present
  await expect(page.locator("h1.font-liturgical")).toBeVisible();
  await expect(page.locator('[data-testid="martyr-story"]')).toBeVisible();
  await expect(page.locator('[data-testid="martyr-prayer"]')).toBeVisible();
});
