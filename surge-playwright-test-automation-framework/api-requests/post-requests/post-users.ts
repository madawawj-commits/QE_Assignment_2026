import { APIRequestContext } from "@playwright/test";
import { postRequest } from '../common-requests/post-request';

export async function createUser(
    request: APIRequestContext,
    userName: string,
    designation: string
) {
    const response = await postRequest(request, userName, designation);
    return response;
}