const BasePage = require('./basePage');
const Header = require('../components/header');
const Sidebar = require('../components/sidebar');
const TableFooter = require('../components/tableFooter');

class DriversPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = new Header(page);
        this.sidebar = new Sidebar(page);
        this.tableFooter = new TableFooter(page);
        this.driverTable = page.locator('table#drivers');
    }

    async verifyDriversPage() {
        await expect(this.driverTable).toBeVisible();
    }
}

module.exports = DriversPage;
