import BaseComponent from "../../BaseComponent.js";
import {expect} from "@playwright/test";


export default class DeletePopup extends BaseComponent {
    constructor(page) {
        super(page, page.locator('app-remove-account-modal'));
        this.removeButton = this._container.locator('button.btn.btn-danger')
    }

    async deleteUser() {
        await this.removeButton.click()
        await expect(this._page).toHaveURL('/')
    }
}
