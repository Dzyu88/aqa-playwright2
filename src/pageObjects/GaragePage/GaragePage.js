import BasePage from "../BasePage.js";
import {expect} from "@playwright/test";


export default class GaragePage extends BasePage {
    constructor(page) {
        super(page, '/panel/garage', page.locator('button.btn-primary'));
        this.pageTitle = page.locator('div h1')

    }
}