const { request } = require('@playwright/test');

class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.context = null;
    this.token = null;
  }

  async init() {
    this.context = await request.newContext();
  }

  async login(username, password) {
    const loginUrl = `${this.baseURL}/login`;
    console.log(`Trying to login with URL: ${loginUrl}`);

    try {
      const response = await this.context.post(loginUrl, {
        data: {
          username: username,
          password: password
        },
        headers: {
          'Content-Type': 'application/json' // Убедитесь, что это правильно
        }
      });

      console.log(`Login response status: ${response.status()}`);

      const responseText = await response.text();
      
      if (responseText.startsWith('<html>')) {
        throw new Error('Login failed. Server returned HTML response.');
      }

      let responseBody;
      try {
        responseBody = JSON.parse(responseText);
        console.log(`Login response body: ${JSON.stringify(responseBody)}`);

        if (response.status() === 200) {
          this.token = responseBody.token; // Убедитесь, что это правильное поле
          this.context = await request.newContext({
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          });
        } else {
          throw new Error('Login failed');
        }
      } catch (jsonError) {
        throw new Error(`Failed to parse JSON: ${jsonError.message}`);
      }

    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
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
