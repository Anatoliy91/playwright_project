class Header {
    constructor(page) {
        this.page = page;
        this.header = page.locator('header');
    }

    async logout() {
        await this.page.click('text=Logout');
    }
}

module.exports = Header;
