import { APIRequestContext } from "@playwright/test";
import { patchRequest } from '../common-requests/patch-request';

export async function patchUser(
    request: APIRequestContext,
    userID: any,
    userName: string,
    designation: string
) {
    const response = await patchRequest(request, `/` + userID, userName, designation);
    return response;
}