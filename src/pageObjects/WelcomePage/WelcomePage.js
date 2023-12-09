import BasePage from "../BasePage.js";
import SignUpPopup from "./components/SignUpPopup.js";
import SignInPopup from "./components/SignInPopup.js";

export default class WelcomePage extends BasePage{
    constructor(page) {
        super(page, '/', page.locator('button', {hasText: 'Guest Log in'}));
        this.signUpButton = page.locator('.btn-primary')
        this.signInButton = page.locator('.header_signin')
    }

    async openSignUpPopup (){
        await this.signUpButton.click()
        return new SignUpPopup(this._page)
    }


    async openSignInPopup (){
        await this.signInButton.click()
        return new SignInPopup(this._page)
    }
}