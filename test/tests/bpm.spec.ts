import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/BPM/)
})

test('displays "TAP" when starting', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).toContainText('TAP')
})

test('displays the bpm after tapping 5 times', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => tap(1111000))
  await page.evaluate(() => tap(1111500))
  await page.evaluate(() => tap(1112000))
  await page.evaluate(() => tap(1112500))
  await page.evaluate(() => tap(1113000))
  await expect(page.locator('body')).toContainText('120')
})

declare var tap: (t: number) => void
