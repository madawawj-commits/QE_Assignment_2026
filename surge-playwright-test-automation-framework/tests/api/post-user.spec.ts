import { test, expect } from '@playwright/test';
import { createUser } from '../../api-requests/post-requests/post-users';
import { CreateUsers } from '../../testData/api/users.json'

test.describe(`Create User`, {
    tag: ['@reqres', '@post', `@createUser`]
}, () => {
    
    //Test_Case_ID
    test(`TEST_CASE_ID Post User - verify status`, async ({ request }) => {
        try {
            const response = await createUser(request, CreateUsers.name, CreateUsers.job);
            console.log(response.status());
            expect(response.status()).toBe(201);
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    //Test_Case_ID
    test(`TEST_CASE_ID Post User - verify response body`, async ({ request }) => {
        try {
            const response = await createUser(request, CreateUsers.name, CreateUsers.job);
            const responseBody = JSON.parse(await response.text());
            expect(responseBody.name).toEqual(CreateUsers.name);
            expect(responseBody.job).toEqual(CreateUsers.job);
            expect(responseBody.id).not.toBeNull();
            console.log(responseBody.id);
            console.log(responseBody.createdAt);
        } catch (error) {
            console.log(error);
            throw error;
        }
    });
});