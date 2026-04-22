import { test, expect } from '@playwright/test';
import { updateUser } from '../../api-requests/put-requests/put-users';
import { PutUsers } from '../../testData/api/users.json';

test.describe(`Put User`, {
    tag: ['@reqres', '@put', '@updateUsers']
}, () => {

    //Test_Case_ID
    test(`TEST_CASE_ID Put User - verify status`, async ({ request }) => {
        try {
            const response = await updateUser(request, PutUsers.userID, PutUsers.name, PutUsers.job);
            console.log(response.status());
            expect(response.status()).toBe(200)
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    //Test_Case_ID
    test(`TEST_CASE_ID Put User - verify response body`, async ({ request }) => {
        try {
            const response = await updateUser(request, PutUsers.userID, PutUsers.name, PutUsers.job);
            const responseBody = JSON.parse(await response.text());
            console.log(responseBody);
            expect(responseBody.name).toEqual(PutUsers.name);
            expect(responseBody.job).toEqual(PutUsers.job);
            expect(responseBody.updatedAt).not.toBeNull();
        } catch (error) {
            console.log(error);
            throw error;
        }
    });
});