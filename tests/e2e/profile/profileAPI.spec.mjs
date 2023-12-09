import {test} from '../../../src/fixtures/test fixture.js'
import {CUSTOM_PROFILES_DATA_RESPONSE_BODY} from "./fixtures/profilesData.js";
import {expect} from "@playwright/test";

test.describe.skip("Interception of response body on Profile page", ()=>{
    test.only('Frontend should send correct request to get data', async ({userProfilePage})=>{
        const { page } = userProfilePage

        await page.route('/api/users/profile', route => route.abort())

        await userProfilePage.editProfileBtn.click()
        await page.pause()
    })

    test('Frontend should use data returned in response', async ({userProfilePage})=>{
        const { page } = userProfilePage

        await page.route('/api/users/profile', route => {
            route.fulfill({body: JSON.stringify(CUSTOM_PROFILES_DATA_RESPONSE_BODY)})
        })

        await page.reload()
        await expect(page.getByText(this.userName)).toBeVisible()

    })
})