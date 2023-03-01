import { test, expect } from '@playwright/test';

const {BuilderPage} = require('../pageObjects/BuilderPage');
const {WarehouseManagerPage} = require('../pageObjects/WarehouseManagerPage');

test('Filtering inventory', async ({ page, context }) =>
{
   let builderPage = new BuilderPage(page);
   //Trial account
   const accountEmail = ""; 
   const accountPass = "";

   await builderPage.navigateToBuilder();
   await builderPage.logInBuilder(accountEmail, accountPass);
   await builderPage.selectRecordsIcon();
   await builderPage.selectWharehouseInventoryObject();
   await builderPage.addFilter("Needs Re-Order", "is", "Yes");
   await page.waitForLoadState();  
    //This delay has been introduced because waitForLoadState() sometimes does not finish before next steps
   await page.waitForTimeout(3000); 
   await page.screenshot({path: 'FilterOnInBuilder.png'});
   const count = await builderPage.checkAllValuesInNeedsReorderTableCell("Yes");

   const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      builderPage.goToLiveApp()
    ])
  
    await expect(newPage).toHaveTitle("Warehouse Manager");
    let warehouseManagerPage = new WarehouseManagerPage(newPage);
  
    const emailAccount = "admin@test.com"
    const password = "test"
    await warehouseManagerPage.logInWarehouseManager(emailAccount, password);
    await warehouseManagerPage.selectInventoryTab();
    await warehouseManagerPage.addNewFilter("Needs Re-Order", "is");

    await newPage.waitForLoadState();
    //This delay has been introduced because waitForLoadState() sometimes does not finish before next steps
    await newPage.waitForTimeout(3000); 
    await newPage.screenshot({path: 'FilterOnInWarehouseManager.png'});

    const warehouseManagerCount = await warehouseManagerPage.checkAllValuesInNeedsReorderTableCell("Yes");
    await expect(count).toBe(warehouseManagerCount);
});






