const { request } = require('@playwright/test');

class API {
  constructor(baseURL, cookies) {
    this.baseURL = baseURL;
    this.context = null;
    this.cookies = cookies;
  }

  async init() {
    this.context = await request.newContext();
    if (this.cookies) {
      await this.context.addCookies(this.cookies);
    }
  }

  async get(endpoint) {
    if (!this.context) {
      throw new Error('API context is not initialized. Call init() first.');
    }

    const url = `${this.baseURL}${endpoint}`;
    const response = await this.context.get(url);
    return response;
  }
}

module.exports = API;
