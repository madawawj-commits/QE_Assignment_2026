import { APIRequestContext } from "@playwright/test";
import { APIEnv } from "../../framework-config/api-env";

//request body - json 
export async function postRequest(
    request: APIRequestContext,
    name: string,
    job: string
) {
    const response = await request.post(`${APIEnv.ENDPOINT}`, {
        data: {
            "name": name,
            "job": job
        }
    });
    return response;
}

//request body - multipart
export async function postRequestMultipart(
    request: APIRequestContext,
    name: string,
    job: string
) {
    const form = new FormData();
    form.set(`name`, name);
    form.set(`job`, job);
    const response = await request.post(`${APIEnv.ENDPOINT}`, {
        multipart: form
    });
    return response;
}