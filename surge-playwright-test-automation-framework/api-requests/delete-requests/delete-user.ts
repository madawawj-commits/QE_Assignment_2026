import { APIRequestContext } from "@playwright/test";
import { deleteRequest } from '../common-requests/delete-request';

export async function deleteUser(
    request: APIRequestContext,
    userId: any
) {
    const response = await deleteRequest(request, `/` + userId);
    return response;
}