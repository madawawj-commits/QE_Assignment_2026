import { APIRequestContext } from "@playwright/test";
import { APIEnv } from "../../framework-config/api-env";


export async function getRequest(
    request: APIRequestContext,
    endpoint: string
) {
    const response = await request.get(`${APIEnv.ENDPOINT}` + endpoint);
    return response;
}