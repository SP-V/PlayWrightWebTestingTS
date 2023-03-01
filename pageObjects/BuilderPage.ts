import { expect, Locator, Page } from '@playwright/test';

export class BuilderPage{

    readonly page: Page; 
    readonly pagesIcon: Locator;
    readonly adminInventoryOption: Locator; 
    readonly inventorySubOption: Locator;
    readonly editThisView: Locator;
    readonly onHandColumn: Locator; 
    readonly ruleTitle: Locator; 
    readonly ruleFieldDropDown: Locator; 
    readonly ruleOperatorDropDown: Locator;
    readonly ruleSelectDropDown: Locator;
    readonly ruleActionDropDown: Locator;
    readonly saveChangesButton: Locator; 
    readonly gotToLiveAppLink: Locator; 
    readonly recordsIcon: Locator; 
    readonly wharehouseInventoryOption: Locator; 
    readonly addFiltersButton: Locator; 
    readonly editFiltersTitle: Locator; 
    readonly fieldDropDown: Locator; 
    readonly operatorDropDown: Locator; 
    readonly selectDropDown: Locator; 
    readonly submitFilterButton: Locator; 
    readonly rowsInFilterTable: Locator; 
    readonly needsReorderColumnList: Locator; 
       
    constructor(page: Page)
    {
        this.page = page; 
        this.pagesIcon = page.locator("//*[@class='icon icon-pages']")
        this.adminInventoryOption = page.locator("//span[text()='Admin > Inventory']")
        this.inventorySubOption = page.locator("//span[text()='Inventory']")
        this.editThisView = page.locator("//*[@content='Click to edit this view']")
        this.onHandColumn = page.locator("//th[@data-item='6']")
        this.ruleTitle = page.locator("//*[@class='title']//span[text()='Display Rule ']//span")
        this.ruleFieldDropDown = page.locator("//*[@class='field-list-field']//option[@value='field_142']")
        this.ruleOperatorDropDown = page.locator("//*[@class='field-list-operator']//option[@value='is']")
        this.ruleSelectDropDown = page.locator("//*[@data-cy='dropdown-select']//option[@value='true']")
        this.ruleActionDropDown = page.locator("//*[@class='display-rule-actions']//option[@value='icon']")
        this.saveChangesButton = page.locator("//a[@class='save']")
        this.gotToLiveAppLink = page.locator("//*[@class='accessMenu_directLink']")
        this.recordsIcon = page.locator("//*[@class='icon icon-database-records']")
        this.wharehouseInventoryOption = page.locator("//span[text()='Warehouse Inventory']")
        this.addFiltersButton = page.locator("//*[@class='fa fa-filter fa']")
        this.editFiltersTitle = page.locator("//h1[text()= 'Edit Filters']")
        this.fieldDropDown = page.locator("//select[@class= 'field-list-field']");
        this.operatorDropDown = page.locator("//select[@class='field-list-operator']")
        this.selectDropDown = page.locator("//div[@class='kn-select']//select")
        this.submitFilterButton = page.locator("//div[@class='save submit-buttons']//button")
        this.rowsInFilterTable = page.locator("//tr[@data-cy='record-row']")
        this.needsReorderColumnList = page.locator("//tr[@data-cy='record-row']//td[@data-cy='table-cell-field_142']//span");
    }

    async navigateToBuilder()
    {
        const wareHouseManagerUrl = "https://builder.knack.com/soniapvlosada/warehouse-manager/schema/list/objects/object_7/fields"
        await this.page.goto(wareHouseManagerUrl)
    }
    
    async logInBuilder(accountEmail, accountPass)
    {
        const emailInput = "#email >> nth=1"
        const passwordInput = "#password >> nth=1"
        const logInButton = "input[type='submit'] >> nth=1"
        
        await this.page.fill(emailInput, accountEmail);
        await this.page.fill(passwordInput, accountPass);
        await this.page.locator(logInButton).click();
    }

    async selectPagesIcon()
    {
        await this.pagesIcon.click();
    }

    async selectAdminInventoryPage()
    {
        await this.adminInventoryOption.click();
    }

    async selectInventoryPage()
    {
        await this.inventorySubOption.click();
    }

    async activateWarehouseInventoryView()
    {
        await this.editThisView.click();
    }

    async clickOnHandColumnHeader()
    {
        await this.onHandColumn.click();
    }

    async validateDisplayRule(index, field, operator, select, action)
    {
        await expect(this.ruleTitle).toHaveText(index);
        await expect(this.ruleFieldDropDown).toHaveText(field);
        await expect(this.ruleOperatorDropDown).toHaveText(operator);
        await expect(this.ruleSelectDropDown).toHaveText(select);
        await expect(this.ruleActionDropDown).toHaveText(action);
    }

    async updateDisplayRuleIconColor(newColor)
    {
        await this.page.fill("//input[@class='kn-input kn-colorInput_input']", newColor);
        await this.saveChangesButton.click(); 
    }

    async goToLiveApp()
    {
        await this.gotToLiveAppLink.click();
    }

    async selectRecordsIcon()
    {
        await this.recordsIcon.click();
    }

    async selectWharehouseInventoryObject()
    {
        await this.wharehouseInventoryOption.click();
    }

    async addFilter(field, operator, select)
    {
        await this.addFiltersButton.click(); 
        await expect(this.editFiltersTitle).toBeVisible();
        await this.fieldDropDown.selectOption(field);
        await this.operatorDropDown.selectOption(operator);
        await this.selectDropDown.selectOption(select);
        await this.submitFilterButton.click();
    }

    async checkAllValuesInNeedsReorderTableCell(text)
    {
        const count = await this.rowsInFilterTable.count();
        for(let i =0; i < count; ++i)
        {
            await expect(this.needsReorderColumnList.nth(i)).toHaveText(text)
        }
        return count;
    }
    
}

module.exports = {BuilderPage};