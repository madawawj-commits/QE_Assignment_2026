import { test, expect } from '@playwright/test'
import { patchUser } from '../../api-requests/patch-requests/patch-users';
import { PatchUsers } from '../../testData/api/users.json'

test.describe(`Patch User`, {
    tag: ['@reqres', '@patch', `@patchUser`]
}, () => {

    //Test_Case_ID
    test(`TEST_CASE_ID Patch User - verify status`, async ({ request }) => {
        try {
            const response = await patchUser(request, PatchUsers.userID, PatchUsers.name, PatchUsers.job);
            console.log(response.status());
            expect(response.status()).toBe(200);
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    //Test_Case_ID
    test(`TEST_CASE_ID Put Emplyee - verify status`, async ({ request }) => {
        try {
            const response = await patchUser(request, PatchUsers.userID, PatchUsers.name, PatchUsers.job);
            const responseBody = JSON.parse(await response.text());
            console.log(responseBody);
            expect(responseBody.name).toEqual(PatchUsers.name);
            expect(responseBody.job).toEqual(PatchUsers.job);
            expect(responseBody.updatedAt).not.toBeNull();
        } catch (error) {
            console.log(error);
            throw error;
        }
    });
});