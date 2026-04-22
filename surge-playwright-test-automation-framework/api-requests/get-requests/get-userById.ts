import { APIRequestContext } from "@playwright/test";
import { getRequest } from '../common-requests/get-request'

//get user by id
export async function getUserbyId(
    request: APIRequestContext,
    userID: any
) {
    const response = await getRequest(request, `/` + userID);
    return response;
}