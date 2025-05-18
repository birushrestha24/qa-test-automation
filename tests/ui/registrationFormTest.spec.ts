import { expect, test } from "@playwright/test";
import StudentFormPage from "../../pages/studentFormPage";
import studentData from '../../test_data/studentData.json'

test.describe('Student Registration Form', () => {
    let studentFormPage: StudentFormPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        studentFormPage = new StudentFormPage(page);
        
        await page.goto('/automation-practice-form');
    })

    test('should able to register student', async () => {
        await studentFormPage.enterFirstName(studentData.firstname);
        await studentFormPage.enterLastName(studentData.lastname);
        await studentFormPage.enterEmail(studentData.email);
        await studentFormPage.enterMobile(studentData.mobile);
        await studentFormPage.selectGender(studentData.gender);
        await studentFormPage.enterDOB(studentData.dob);
        await studentFormPage.enterAddress(studentData.address);
        await studentFormPage.selectHobyy(studentData.hobby);
        await studentFormPage.selectUploadPicture();
        await studentFormPage.selectSubject(studentData.subject);
        await studentFormPage.enterAddress(studentData.address);
        await studentFormPage.clickSubmit();
        
        const titleName = await studentFormPage.getTitle();
        expect(titleName).toContain("Thanks for submitting the form");
    });
});