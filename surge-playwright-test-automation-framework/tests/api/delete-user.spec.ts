import { test, expect } from '@playwright/test';
import { deleteUser } from '../../api-requests/delete-requests/delete-user';
import { DeleteUserByID } from '../../testData/api/users.json';

test.describe(`Delete Users`, {
    tag: ['@reqres', '@delete', `@deleteUser`]
}, () => {

    //Test_Case_ID
    test(`TEST_CASE_ID Delete User - verify status`, async ({ request }) => {
        try {
            const response = await deleteUser(request, DeleteUserByID.userID);
            console.log(response.status());
            expect(response.status()).toBe(204);
        } catch (error) {
            console.log(error);
            throw error;
        }
    });
});