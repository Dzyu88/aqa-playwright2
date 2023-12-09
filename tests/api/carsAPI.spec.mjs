import {test} from "../../src/fixtures/test fixture.js";
import {VALID_BRANDS_RESPONSE_BODY} from "../../src/data/dict/brands.js";
import {VALID_MODELS_RESPONSE_BODY} from "../../src/data/dict/models.js";
import {expect} from "@playwright/test";
import GaragePage from "../../src/pageObjects/GaragePage/GaragePage.js";

test.describe.skip("API", ()=>{
    test.skip("should return valid brands", async ({userAPIClient})=>{
        const response = await userAPIClient.fetch('/api/cars/brands')
        console.log(response)
    })

    test('should create new car', async ({userAPIClient, page})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id
        const modelId = VALID_MODELS_RESPONSE_BODY[brandId].data[1].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }
        // await page.pause()
        const response = await userAPIClient.post('api/cars', {
            data: requestBody
        })
        const body = await response.json()
        await expect(response, "Positive response should be returned").toBeOK()
        expect(response.status(), "Status code should be 201").toEqual(201)
        expect(body.status).toBe('ok')
        expect(body.data, "Car should be created with data from request").toMatchObject(requestBody)
    })

    test('Car model is undefined', async ({userAPIClient})=>{
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[4].id
        const modelId = 6
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }
        const response = await userAPIClient.post('api/cars', {
            data: requestBody
        })
        await expect(response.message, "Undefined status should be reterned").toBe(undefined)
    })

    test('User is not logged in', async ({request, page})=>{

        const garagePage = new GaragePage(page)
        await garagePage.navigate()
        const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id
        const modelId = VALID_MODELS_RESPONSE_BODY[brandId].data[1].id
        const requestBody = {
            "carBrandId": brandId,
            "carModelId": modelId,
            "mileage": 122
        }
        const response = await request.post('api/cars', {
            data: requestBody
        })
        // console.log(response)
        expect(response.status(), "Status code should be 401").toBe(401)

    })
})