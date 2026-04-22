import { APIRequestContext } from "@playwright/test";
import { APIEnv } from "../../framework-config/api-env";

//request body - json 
export async function putRequest(
    request: APIRequestContext,
    userId: any,
    name: string,
    job: string
) {
    const response = await request.put(`${APIEnv.ENDPOINT}` + userId, {
        data: {
            "name": name,
            "job": job
        }
    });
    return response;
}

//request body - multipart
export async function putRequestMultipart(
    request: APIRequestContext,
    userID: any,
    name: string,
    job: string
) {
    const form = new FormData();
    form.set(`name`, name);
    form.set(`job`, job);
    const response = await request.put(`${APIEnv.ENDPOINT}` + userID, {
        multipart: form
    });
    return response;
}