import BasePage from "../BasePage.js";
import SignUpPopup from "../WelcomePage/components/SignUpPopup.js";
import DeletePopup from "./components/DeletePopup.js";


export default class SettingsPage extends BasePage{
    constructor(page) {
        super(page, 'panel/settings/');
        this.removeAccountButton = page.locator('button.btn.btn-danger-bg')
    }

    async openDeletePopup (){
        await this._page.locator('#userNavDropdown').click()
        await this._page.locator('a.dropdown-item.btn.btn-link.user-nav_link', {hasText: 'Settings'}).click()
        await this.removeAccountButton.click()
        return new DeletePopup(this._page)
    }
}