import BaseComponent from "./BaseComponent.js";
import {expect} from "@playwright/test";

export default class BasePage extends BaseComponent {
    constructor(page, url, container) {
        const wrapper = container ?? page.locator('html')
        super(page, wrapper);
        this._url = url
        // this.header = new Header(page)
    }

    async navigate(){
        await this.open()
        await this.waitLoaded()
    }

    async open(){
        await this._page.goto(this._url)
    }

    async logout(){
        await this._page.locator('#userNavDropdown').click()
        await this._page.locator('nav.user-nav_menu.dropdown-menu button.dropdown-item').click()
        await expect(this._page).toHaveURL('/')
    }

    async deleteUser(){
        await this._page.locator('#userNavDropdown').click()
        await this._page.locator('a.dropdown-item.btn.btn-link.user-nav_link', {hasText: 'Settings'}).click()
        await this._page.locator('button.btn.btn-danger-bg').click()
        await this._page.locator('app-remove-account-modal').click()
        await this._page.locator('button.btn.btn-danger').click()
    }
}