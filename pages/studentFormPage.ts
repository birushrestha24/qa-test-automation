import { Locator, Page, expect } from "@playwright/test";
import path from "path";

class StudentFormPage {
    page: Page;
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    mobile: Locator;
    gender: Locator;
    dob: Locator;
    subject: Locator;
    hobby: Locator;
    address: Locator;
    uploadPicture: Locator;
    submit: Locator;
    title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[id="firstName"]');
        this.lastName = page.locator('[id="lastName"]');
        this.email = page.locator('[id="userEmail"]');
        this.mobile = page.locator('[id="userNumber"]');
        this.dob = page.locator('[id="dateOfBirthInput"]');
        this.subject = page.locator('[id="subjectsInput"]');
        this.address = page.locator('[id="currentAddress"]');
        this.uploadPicture = page.locator('[id="uploadPicture"]');
        this.submit = page.locator('[id="submit"]');
        this.title = page.locator('[id="example-modal-sizes-title-lg"]');
    }

    async enterFirstName(name) {
        await expect(this.firstName).toBeVisible();
        return await this.firstName.fill(name);
    }

    async enterLastName(name) {
        await expect(this.lastName).toBeVisible();
        return await this.lastName.fill(name);
    }

    async enterEmail(email) {
        return await this.email.fill(email);
    }

    async enterMobile(num) {
        return await this.mobile.fill(num);
    }

    async selectGender(gender) {
        switch(gender) {
            case "Male":
                if (!await this.page.isChecked('[id="gender-radio-1"]')) {
                    return await this.page.check('[for="gender-radio-1"]');
                }
                break;
            
            case "Female":
                if (!await this.page.isChecked('[id="gender-radio-1"]')) {
                    return await this.page.check('for="gender-radio-2"]');
                }
                break;
            
            case "Other":
                if (!await this.page.isChecked('[id="gender-radio-3"]')) {
                    return await this.page.check('for="gender-radio-2"]');
                }
                break;

            default:
                break;
        }
    }

    async enterDOB(date) {
        await this.dob.fill(date);
        return await this.dob.press('Enter');
    }

    async selectSubject(subject) {
        await this.subject.fill(subject);
        return await this.subject.press('Enter');
    }

    async selectHobyy(hobby) {
        switch(hobby) {
            case "Sports":
                if (!this.page.isChecked('[id="hobbies-checkbox-1"]')) {
                    return await this.page.check('[for="hobbies-checkbox-1"]');
                }
                break;
            
            case "Reading":
                if (!this.page.isChecked('[id="hobbies-checkbox-2"]')) {
                    return await this.page.check('[id="hobbies-checkbox-2"]')
                }
                break;
            
            case "Music":
                if (!this.page.locator('[[id="hobbies-checkbox-3"]')) {
                    return await this.page.check('[[id="hobbies-checkbox-3"]')
                }
                break;

            default:
                break;
        }
    }

    async enterAddress(address) {
        return await this.address.fill(address);
    }

    async clickSubmit() {
        await expect(this.submit).toBeVisible();
        await this.submit.click({ force: true });
    }

    async selectUploadPicture() {
        const filepath = path.join(process.cwd(), 'test_data', 'picture.jpeg');
        return await this.uploadPicture.setInputFiles(filepath);
    }

    async getTitle(){
        const titleName = await this.title.evaluate(e => e.textContent);
        console.log(titleName)
        return titleName;
    }
}

export default StudentFormPage