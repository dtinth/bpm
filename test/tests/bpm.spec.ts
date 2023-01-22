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

test('resets the bpm when beat is not kept', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => tap(1111000))
  await page.evaluate(() => tap(1111500))
  await page.evaluate(() => tap(1112000))
  await page.evaluate(() => tap(1112500))
  await page.evaluate(() => tap(1113000))
  await expect(page.locator('body')).toContainText('120')

  await page.evaluate(() => tap(2111000))
  await expect(page.locator('body')).toContainText('TAP')
  await page.evaluate(() => tap(2112000))
  await page.evaluate(() => tap(2113000))
  await page.evaluate(() => tap(2114000))
  await page.evaluate(() => tap(2115000))
  await expect(page.locator('body')).toContainText('60')
})

declare var tap: (t: number) => void
