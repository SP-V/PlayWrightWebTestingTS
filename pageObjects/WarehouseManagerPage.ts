import { expect, Locator, Page } from '@playwright/test';

export class WarehouseManagerPage{

    readonly page: Page; 
    readonly emailInput: Locator; 
    readonly passwordInput: Locator; 
    readonly signInButton: Locator; 
    readonly inventoryTab: Locator;
    readonly warningList: Locator;
    readonly addFiltersButton: Locator; 
    readonly fieldDropDown: Locator; 
    readonly operatorDropDown: Locator;
    readonly submitFilterButton: Locator; 
    readonly rowsInAdminFilterTable: Locator; 
       
       
    constructor(page: Page)
    {
        this.page = page; 
        this.inventoryTab = page.locator("//a[@href='#inventory2'] >> nth=0");
        this.warningList = page.locator("//i[@class='fa fa-warning']");
        this.addFiltersButton = page.locator("//div[@class= 'kn-filters-nav']");
        this.fieldDropDown = page.locator("//select[@class= 'field select']");
        this.operatorDropDown = page.locator("//select[@class= 'operator kn-select']");
        this.submitFilterButton = page.locator("//input[@id= 'kn-submit-filters']");
        this.rowsInAdminFilterTable = page.locator("//table[@class='kn-table kn-table-table knTable is-bordered is-striped knTable--borders knTable--spacing-medium knTable--striped kn-table--has-sticky-headers']//tbody//tr//td[@class='field_142']")
    }

    async logInWarehouseManager(emailAccount, password)
    {
        const emailInput = "//input[@id='email']"
        const passwordInput = "//input[@id='password']"
        const signInButton = "//input[@type='submit']"
        
        await this.page.fill(emailInput, emailAccount);
        await this.page.fill(passwordInput, password);
        await this.page.locator(signInButton).click();
    }

    async selectInventoryTab()
    {
        await this.inventoryTab.click(); 
    }

    async checkAllElementsInWarningListHaveAColor(color)
    {
        const count = await this.warningList.count();
        for(let i =0; i < count; ++i)
        {
            const style = await this.warningList.nth(i).getAttribute('style'); 
            await expect(style).toContain(color);
        }
    }

    async addNewFilter(field, operator)
    {
        await this.addFiltersButton.click(); 
        await this.fieldDropDown.selectOption(field);
        await this.operatorDropDown.selectOption(operator);
        await this.submitFilterButton.click();
    }
    
    async checkAllValuesInNeedsReorderTableCell(text)
    {
        const count = await this.rowsInAdminFilterTable.count();
            
        for(let i =0; i < count; ++i)
        {
            await expect(this.rowsInAdminFilterTable.nth(i)).toContainText(text)
        }
        return count; 
    }
}

module.exports = {WarehouseManagerPage};