
import {expect, test} from "@playwright/test"

test.describe('Registration @smoke',()=>{

    test.beforeEach(async ({page})=>{

        await page.goto('/')
    })

    test('Positive scenario', async ({page})=>{

        const name = 'Sasha'
        const lastName = 'Dzyu'
        const email = 'aqa-dzyu@mail.com'
        const password = '1234Password'
        const repeatPassword = password

        const signUpButton = page.locator('button.hero-descriptor_btn.btn.btn-primary')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await expect(signUpButton, 'Sign up button should be enabled').toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('div.modal-content')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword')

        await nameInput.fill(name)
        await lastNameInput.fill(lastName)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(password)

        const registerButton = popup.locator('button.btn-primary', {hasText: 'Register'})
        await registerButton.click()

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')

        await page.goto('/panel/settings')
        const removeAccountButton = page.locator('button.btn.btn-danger-bg')
        await removeAccountButton.click()
        const removePopup = page.locator('app-remove-account-modal')
        const removeButton = removePopup.locator('button.btn.btn-danger')
        await removeButton.click()
    })

    test('Empty field Name', async ({page})=>{

        const name = 'Sasha'
        const lastName = 'Dzyu'
        const email = 'aqa-dzyu@mail.com'
        const password = '1234Password'
        const repeatPassword = password

        const signUpButton = page.locator('button.hero-descriptor_btn.btn.btn-primary')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await expect(signUpButton, 'Sign up button should be enabled').toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('div.modal-content')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword')

        await nameInput.click()
        await lastNameInput.fill(lastName)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(password)
        const nameErrorMessage = popup.locator('div.invalid-feedback')

        await expect(nameErrorMessage, 'Error message should be shown when field name is empty').toBeVisible()
        await expect(nameErrorMessage, 'Error message should be shown when field name is empty').toHaveText('Name required')
        await expect(nameInput, 'Name input should has red border when field name is empty').toHaveCSS('border-color', 'rgb(220, 53, 69)')

    })

    test('Wrong data length in Last Name field', async ({page})=>{

        const name = 'Sasha'
        const lastName = 'D'
        const email = 'aqa-dzyu@mail.com'
        const password = '1234Password'
        const repeatPassword = password

        const signUpButton = page.locator('button.hero-descriptor_btn.btn.btn-primary')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await expect(signUpButton, 'Sign up button should be enabled').toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('div.modal-content')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword')

        await nameInput.fill(name)
        await lastNameInput.fill(lastName)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(password)
        const lastNameErrorMessage = popup.locator('div.invalid-feedback')

        await expect(lastNameErrorMessage, 'Error message should be shown when data with wrong length entered in Last Name field').toBeVisible()
        await expect(lastNameErrorMessage, 'Error message should be shown when data with wrong length entered in Last Name field').toHaveText('Last name has to be from 2 to 20 characters long')
        await expect(lastNameErrorMessage, 'Last Name input should has red border when data with wrong length entered in Last Name field').toHaveCSS('border-color', 'rgb(220, 53, 69)')

    })

    test('Wrong data in Email field', async ({page})=>{

        const name = 'Sasha'
        const lastName = 'Dzyu'
        const email = 'aqa-dzyu.com'
        const password = '1234Password'
        const repeatPassword = password

        const signUpButton = page.locator('button.hero-descriptor_btn.btn.btn-primary')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await expect(signUpButton, 'Sign up button should be enabled').toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('div.modal-content')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword')

        await nameInput.fill(name)
        await lastNameInput.fill(lastName)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(password)
        const emailErrorMessage = popup.locator('div.invalid-feedback')

        await expect(emailErrorMessage, 'Error message should be shown when wrong data entered in Email field').toBeVisible()
        await expect(emailErrorMessage, 'Error message should be shown when wrong data entered in Email field').toHaveText('Email is incorrect')
            await expect(emailErrorMessage, 'Email input should has red border when wrong data entered in Email field').toHaveCSS('border-color', 'rgb(220, 53, 69)')

    })

    test('Wrong data in Password field', async ({page})=>{

        const name = 'Sasha'
        const lastName = 'Dzyu'
        const email = 'aqa-dzyu@mail.com'
        const password = '12341234Password'
        const repeatPassword = '12341234Password'

        const signUpButton = page.locator('button.hero-descriptor_btn.btn.btn-primary')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await expect(signUpButton, 'Sign up button should be enabled').toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('div.modal-content')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword')

        await nameInput.fill(name)
        await lastNameInput.fill(lastName)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(repeatPassword)
        const passwordErrorMessage = popup.locator('div.invalid-feedback')

        await expect(passwordErrorMessage, 'Error message should be shown when wrong data entered in Password field').toBeVisible()
        await expect(passwordErrorMessage, 'Error message should be shown when wrong data entered in Password field').toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        await expect(passwordErrorMessage, 'Password input should has red border when wrong data entered in Password field').toHaveCSS('border-color', 'rgb(220, 53, 69)')

    })

    test('Re-entered password do not match with Password', async ({page})=>{

        const name = 'Sasha'
        const lastName = 'Dzyu'
        const email = 'aqa-dzyu@mail.com'
        const password = '1234Password'
        const repeatPassword = '12333Password'

        const signUpButton = page.locator('button.hero-descriptor_btn.btn.btn-primary')
        await expect(signUpButton, 'Sign up button should be visible').toBeVisible()
        await expect(signUpButton, 'Sign up button should be enabled').toBeEnabled()
        await signUpButton.click()

        const popup = page.locator('div.modal-content')
        await expect(popup, "Sign up popup should be visible").toBeVisible()

        const nameInput = popup.locator('input#signupName')
        const lastNameInput = popup.locator('input#signupLastName')
        const emailInput = popup.locator('input#signupEmail')
        const passwordInput = popup.locator('input#signupPassword')
        const repeatPasswordInput = popup.locator('input#signupRepeatPassword')

        await nameInput.fill(name)
        await lastNameInput.fill(lastName)
        await emailInput.fill(email)
        await passwordInput.fill(password)
        await repeatPasswordInput.fill(repeatPassword)

        await nameInput.click()

        const repeatPasswordErrorMessage = popup.locator('div.invalid-feedback')

        await expect(repeatPasswordErrorMessage, 'Error message should be shown when wrong data entered in Re-enter password field').toBeVisible()
        await expect(repeatPasswordErrorMessage, 'Error message should be shown when wrong data entered in Re-enter password field').toHaveText('Passwords do not match')
        await expect(repeatPasswordErrorMessage, 'Repeat password input should has red border when wrong data entered in Re-enter password field').toHaveCSS('border-color', 'rgb(220, 53, 69)')

    })
})