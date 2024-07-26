import { request, APIRequestContext, APIResponse } from '@playwright/test';

export class API {
  private baseURL: string;
  private context: APIRequestContext | null = null;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async init(): Promise<void> {
    this.context = await request.newContext();
  }

  async login(username: string, password: string): Promise<void> {
    const loginUrl = `${this.baseURL}/login`;

    const response: APIResponse = await this.context!.post(loginUrl, {
      data: {
        username,
        password,
      },
    });

    console.log(`Login response status: ${response.status()}`);
    const responseText = await response.text();
    console.log(`Login response body: ${responseText}`);

    if (response.status() === 200) {
      try {
        const responseBody = JSON.parse(responseText);
        this.token = responseBody.token;
        this.context = await request.newContext({
          extraHTTPHeaders: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
      } catch (jsonError) {
        throw new Error(`Failed to parse JSON: ${jsonError.message}`);
      }
    } else if (responseText.startsWith('<html>')) {
      throw new Error('Login failed. Server returned HTML response.');
    } else {
      throw new Error('Login failed');
    }
  }

  async get(endpoint: string): Promise<APIResponse> {
    if (!this.context) {
      throw new Error('API context is not initialized. Call init() first.');
    }
    const url = `${this.baseURL}${endpoint}`;
    const response: APIResponse = await this.context.get(url);
    return response;
  }
}
