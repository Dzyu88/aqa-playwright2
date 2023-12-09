import {expect, test} from "@playwright/test";
import WelcomePage from "../../../src/pageObjects/WelcomePage/WelcomePage.js";
import SignUpPopup from "../../../src/pageObjects/WelcomePage/components/SignUpPopup.js";
import SettingsPage from "../../../src/pageObjects/SettingsPage/SettingsPage.js";

test.describe.only('Auth', ()=>{
    let page
    let welcomePage
    let signUpPopup
    let settingsPage
    let deletePopup

        const borderErrorColor = 'rgb(220, 53, 69)'
        const baseSignUpData = {
        name: 'Sasha',
        lastName: 'Dzyu',
        email: 'dzyu@mail.com',
        password: '1234Password',
        rePassword: '1234Password'
    }

    test.beforeAll(async ({browser})=>{
        const ctx = await browser.newContext()
        page = await ctx.newPage()
        welcomePage = new WelcomePage(page)
    })

    test.beforeEach(async ()=>{
        await welcomePage.navigate()
        signUpPopup = await welcomePage.openSignUpPopup()
    })

    test('Successful registration', async ()=>{
        await signUpPopup.registerNewUser(baseSignUpData)
        settingsPage = new SettingsPage(page)
        deletePopup = await settingsPage.openDeletePopup()
        await deletePopup.deleteUser()
    })

    test('Empty field Name', async ()=>{
        const signUpData = {
            ...baseSignUpData,
            name: ''
        }

        await signUpPopup.fill(signUpData)
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible()
        await expect(signUpPopup.errorMessage, "Error message should be shown when field name is empty").toHaveText('Name required')
        await expect(signUpPopup.errorMessage, 'Name input should has red border when wrong data entered in Email field').toHaveCSS('border-color', borderErrorColor)
    })

    test('Wrong data length in Last Name field', async ()=>{
        const signUpData = {
            ...baseSignUpData,
            lastName: 'D'
        }

        await signUpPopup.fill(signUpData)
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible()
        await expect(signUpPopup.errorMessage, "Error message should be shown when data with wrong length entered in Last Name field").toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(signUpPopup.errorMessage, 'Last Name input should has red border when wrong data entered in Email field').toHaveCSS('border-color', borderErrorColor)
    })


    test('Wrong data in Email field', async ()=>{
        const signUpData = {
            ...baseSignUpData,
            email: 'aqa-dzyu.com'
        }

        await signUpPopup.fill(signUpData)
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible()
        await expect(signUpPopup.errorMessage, "Error message should be valid").toHaveText('Email is incorrect')
        await expect(signUpPopup.errorMessage, 'Email input should has red border when wrong data entered in Email field').toHaveCSS('border-color', borderErrorColor)
    })

    test('Wrong data in Password field', async ()=>{
        const signUpData = {
            ...baseSignUpData,
            password: '12341234Password'
        }

        await signUpPopup.fill(signUpData)
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible()
        await expect(signUpPopup.errorMessage, "Error message should be shown when wrong data entered in Password field").toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(signUpPopup.errorMessage, 'Password input should has red border when wrong data entered in Password field').toHaveCSS('border-color', borderErrorColor)
    })

    test('Re-entered password do not match with Password', async ()=>{
        const signUpData = {
            ...baseSignUpData,
            rePassword: '1233Password'
        }

        await signUpPopup.fill(signUpData)
        await signUpPopup.nameInput.click()
        await expect(signUpPopup.errorMessage, "Error message should be visible").toBeVisible()
        await expect(signUpPopup.errorMessage, "Error message should be shown when wrong data entered in Re-enter password field").toHaveText('Passwords do not match')
        await expect(signUpPopup.errorMessage, 'Repeat password input should has red border when wrong data entered in Re-enter password field').toHaveCSS('border-color', borderErrorColor)
    })

})