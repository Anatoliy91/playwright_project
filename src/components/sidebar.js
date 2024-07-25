class Sidebar {
    constructor(page) {
        this.page = page;
        this.sidebar = page.locator('aside.sidebar');
    }

    async navigateToDrivers() {
        await this.page.click('text=Drivers');
    }

    async navigateToTrucks() {
        await this.page.click('text=Trucks');
    }
}

module.exports = Sidebar;
