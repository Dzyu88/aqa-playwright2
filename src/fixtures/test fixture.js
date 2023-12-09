import {test as base, request} from "@playwright/test"
import ProfilePage from "../pageObjects/profilePage/ProfilePage.js";
import WelcomePage from "../pageObjects/WelcomePage/WelcomePage.js";
import {USERS} from "../data/dict/users.js";
import {STORAGE_STATE_USER_PATH} from "../data/storageState.js";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";

export const test = base.extend(({
    userInfo: USERS.JOE_DOU,
    userProfilePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        const popup = await welcomePage.openSignInPopup()
        await popup.signIn({
            email: USERS.JOE_DOU.email,
            password: USERS.JOE_DOU.password
        })

        const profilePage = new ProfilePage(page)
        await profilePage.navigate()
        await use(profilePage)
    },

    userGaragePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()
        await use(garagePage)
    },

    userAPIClient: async ({}, use)=>{
        const ctx = await request.newContext({
            storageState: STORAGE_STATE_USER_PATH
        })
        await use(ctx)
    }
}))