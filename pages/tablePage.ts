import { Locator, Page, expect } from "@playwright/test";

class TablePage {
    page: Page;
    addRecord: Locator;
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    age: Locator;
    salary: Locator;
    department: Locator;
    submit: Locator;
    searchBox: Locator;
    edit: Locator;
    delete: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addRecord = this.page.locator('#addNewRecordButton');
        this.firstName = this.page.locator('#firstName');
        this.lastName = this.page.locator('#lastName');
        this.email = this.page.locator('#userEmail');
        this.age = this.page.locator('#age');
        this.salary = this.page.locator('#salary');
        this.department = this.page.locator('#department');
        this.submit = this.page.locator('#submit');
        this.searchBox = this.page.locator('#searchBox');
        this.edit = this.page.locator('(//span[@title="Edit"])[1]');
        this.delete = this.page.locator('(//span[@title="Delete"])[1]');
    }

    async clickAdd() {
        await this.addRecord.click();
    }

    async enterFirstName(name) {
        return await this.firstName.fill(name);
    }

    async enterLastName(name) {
        return await this.lastName.fill(name);
    }

    async enterEmail(email) {
        return await this.email.fill(email);
    }

    async enterAge(age) {
        return await this.age.fill(age);
    }

    async enterSalary(salary) {
        return await this.salary.fill(salary);
    }

    async enterDeparment(department) {
        return await this.department.fill(department);
    }

    async clickSubmit() {
        await expect(this.submit).toBeVisible();
        await this.submit.click({ force: true });
    }

    async searchUser(user) {
        return await this.searchBox.fill(user);
    }

    async clickEdit() {
        await this.edit.click();
    }

    async updateFirstName(name) {
        await expect(this.firstName).toBeVisible();
        return await this.firstName.fill(name);
    }

    async updateLastName(name) {
        await expect(this.lastName).toBeVisible();
        return await this.lastName.fill(name);
    }

    async updateEmail(email) {
        return await this.email.fill(email);
    }

    async updateAge(age) {
        return await this.email.fill(age);
    }

    async updateSalary(salary) {
        return await this.email.fill(salary);
    }

    async updateDeparment(department) {
        return await this.email.fill(department);
    }

    async clickDelete() {
        await this.delete.click();
    }

    async getUserName(username){
        const user = await this.page.locator('div.rt-td', { hasText: `${username}` });
        return user;
    }
}

export default TablePage