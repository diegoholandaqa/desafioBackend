import { request as pwRequest, APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://fakerestapi.azurewebsites.net';

export async function createRequestContext(): Promise<APIRequestContext> {
  return await pwRequest.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}
export async function apiRequest(
  request: APIRequestContext,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any
) {
  const options: any = data ? { data } : {};

  switch (method) {
    case 'GET':
      return request.get(url, options);
    case 'POST':
      return request.post(url, options);
    case 'PUT':
      return request.put(url, options);
    case 'DELETE':
      return request.delete(url, options);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}