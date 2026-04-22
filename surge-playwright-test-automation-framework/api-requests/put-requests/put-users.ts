import { APIRequestContext } from "@playwright/test";
import { putRequest } from '../common-requests/put-request';

export async function updateUser(
    request: APIRequestContext,
    userID: any,
    userName: string,
    designation: string
) {
    const response = await putRequest(request, `/` + userID, userName, designation);
    return response;
}