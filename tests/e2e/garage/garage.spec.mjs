import {test} from "../../../src/fixtures/test fixture.js";
import {expect} from "@playwright/test";
import WelcomePage from "../../../src/pageObjects/WelcomePage/WelcomePage.js";
import {USERS} from "../../../src/data/dict/users.js";


test.describe.skip('Garage page', ()=> {
    test('Page title should contain Garage', async ({userGaragePage})=>{
        await expect(userGaragePage.pageTitle, 'Page title should be displeyed').toHaveText(`Garage`)
    })
})