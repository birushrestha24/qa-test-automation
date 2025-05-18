import { expect, test } from "@playwright/test";
import TablePage from "../../pages/tablePage";
import userData from "../../test_data/userData.json";

test.describe('Table Test', () => {
    let tablePage: TablePage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        tablePage = new TablePage(page);
        
        await page.goto('/webtables');
    })

    test('CRUD table test', async () => {
        //Add
        await tablePage.clickAdd();
        await tablePage.enterFirstName(userData.firstname);
        await tablePage.enterLastName(userData.lastname);
        await tablePage.enterEmail(userData.email);
        await tablePage.enterAge(userData.age);
        await tablePage.enterSalary(userData.salary);
        await tablePage.enterDeparment(userData.department);
        await tablePage.clickSubmit();
        
        // View
        let user = await tablePage.getUserName(userData.firstname);
        expect(user).toBeVisible();
        
        //Edit
        await tablePage.searchUser(userData.firstname);
        await tablePage.clickEdit();
        await tablePage.enterFirstName(userData.editFirstname);
        await tablePage.enterLastName(userData.editLastname);
        await tablePage.enterEmail(userData.editEmail);
        await tablePage.enterAge(userData.editAge);
        await tablePage.enterSalary(userData.editSalary);
        await tablePage.enterDeparment(userData.editDepartment);
        await tablePage.clickSubmit();

        // View Edit
        user = await tablePage.getUserName(userData.editFirstname);
        expect(user).toBeVisible();

        //Delete
        await tablePage.searchUser(userData.editFirstname);
        await tablePage.clickDelete();
    });
});