import { APIRequestContext } from "@playwright/test";
import { APIEnv } from "../../framework-config/api-env";


export async function deleteRequest(
    request: APIRequestContext,
    endpoint: string
) {
    const response = await request.delete(`${APIEnv.ENDPOINT}` + endpoint);
    return response;
}