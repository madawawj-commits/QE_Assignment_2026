import { test, expect } from '@playwright/test';
import { getUserbyId } from '../../api-requests/get-requests/get-userById';
import { GetUserByID } from '../../testData/api/users.json';

test.describe(`Get Users`, {
    tag: [`@reqres`,'@get', '@getById']
}, () => {

    //Test_Case_ID
    test(`TEST_CASE_ID Get User - verify status`, async ({ request }) => {
        try {
            const response = await getUserbyId(request, GetUserByID.userID);
            console.log(response.status());
            expect(response.status()).toBe(200);
        } catch (error) {
            console.error("Error in POST Request:", error);
            throw error;
        }
    })

    //Test_Case_ID
    test(`TEST_CASE_ID Get User - verify Email`, async ({ request }) => {
        try {
            const response = await getUserbyId(request, GetUserByID.userID);
            console.log(response.status());
            const responseBody = JSON.parse(await response.text());
            console.log(responseBody);
            expect(response.status()).toBe(200);
            expect(responseBody.data.id).toBe(2);
            expect(responseBody.data.email).toEqual(GetUserByID.expectUseremail);
        } catch (error) {
            console.log(error);
            throw error;
        }
    });
});