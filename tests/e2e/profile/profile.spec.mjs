import {test} from '../../../src/fixtures/test fixture.js'
import {expect} from "@playwright/test";

test.describe.skip('User profile', ()=>{
    test('page should contain valid user info', async ({userProfilePage, userInfo})=>{
        await expect(userProfilePage.userName, 'Valid user name should be displeyed').toHaveText(`${userInfo.name} ${userInfo.lastName}`)
    })
})