import { APIRequestContext } from "@playwright/test";
import { getRequest } from '../common-requests/get-request'

//get users
export async function getUsers(
    request: APIRequestContext,
    pageNo: any
) {
    const response = await getRequest(request, `?page=` + pageNo);
    return response;
}