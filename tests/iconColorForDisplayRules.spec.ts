import { test, expect } from '@playwright/test';
import { color } from 'pengrape';

const {BuilderPage} = require('../pageObjects/BuilderPage');
const {WarehouseManagerPage} = require('../pageObjects/WarehouseManagerPage');
 

test('Icon color for Display Rules', async ({ page, context }) =>
{
  let builderPage = new BuilderPage(page);
  //Trial account
  const accountEmail = ""; 
  const accountPass = "";
  
  await builderPage.navigateToBuilder();
  await builderPage.logInBuilder(accountEmail, accountPass);
  await builderPage.selectPagesIcon();
  await builderPage.selectAdminInventoryPage();
  await builderPage.selectInventoryPage();
  await builderPage.activateWarehouseInventoryView();
  await builderPage.clickOnHandColumnHeader();
  await builderPage.validateDisplayRule(" #1", "Needs Re-Order", "is", "Yes", "Display Icon");
  const randomColor = color({ format: 'hex' });
  await builderPage.updateDisplayRuleIconColor(randomColor);
  await page.screenshot({path: 'NewColorInBuilder.png'});

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
  await page.screenshot({path: 'NewColorInWarehouseManager.png'});
  await warehouseManagerPage.checkAllElementsInWarningListHaveAColor(randomColor);
});




