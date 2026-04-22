import { test, expect } from '@playwright/test';
import { getUsers } from '../../api-requests/get-requests/get-users';
import { GetUsers } from '../../testData/api/users.json'

test.describe(`Get Users`, {
    tag: ['@reqres', '@get', `@getUsers`]
}, () => {
    
    //Test_Case_ID
    test(`TEST_CASE_ID Get Users - verify status`, async ({ request }) => {
        try {
            const response = await getUsers(request, GetUsers.pageID);
            console.log(response.status());
            expect(response.status()).toBe(200);
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    //Test_Case_ID
    test(`TEST_CASE_ID Get Users - verify body`, async ({ request }) => {
        try {
            const response = await getUsers(request, GetUsers.pageID);
            console.log(response.status());
            const responseBody = JSON.parse(await response.text());
            console.log(responseBody);
            expect(responseBody.page).toBe(GetUsers.pageID);
            expect(responseBody.data).not.toBe([]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    });
});