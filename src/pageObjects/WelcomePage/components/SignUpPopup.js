import BaseComponent from "../../BaseComponent.js";
import {expect} from "@playwright/test";

export default class SignUpPopup extends BaseComponent {
    constructor(page) {
        super(page, page.locator('app-signup-modal'));
        this.nameInput = this._container.locator('#signupName')
        this.lastNameInput = this._container.locator('#signupLastName')
        this.emailInput = this._container.locator('#signupEmail')
        this.passwordInput = this._container.locator('#signupPassword')
        this.rePasswordInput = this._container.locator('#signupRepeatPassword')
        this.signUpButton = this._container.locator('.btn-primary')

        this.errorMessage = this._container.locator('div.invalid-feedback')

    }

    async fill(signUpData){
        await this.nameInput.fill(signUpData.name)
        await this.lastNameInput.fill(signUpData.lastName)
        await this.emailInput.fill(signUpData.email)
        await this.passwordInput.fill(signUpData.password)
        await this.rePasswordInput.fill(signUpData.rePassword)
    }

    async registerNewUser(signUpData){
        await this.fill(signUpData)
        await this.signUpButton.click()
        await expect(this._page).toHaveURL('/panel\/garage')

    }

}