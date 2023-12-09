import BasePage from "../BasePage.js";
import {expect} from "@playwright/test";


export default class ProfilePage extends BasePage {
    constructor(page) {
        super(page, '/panel/profile', page.locator('button', {hasText: 'Edit profile'}));
        this.userName = page.locator('.profile_name')
        this.editProfileBtn = page.locator('button', {hasText: 'Edit profile'})

    }
}