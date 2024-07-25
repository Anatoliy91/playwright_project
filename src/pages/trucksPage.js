const BasePage = require('./basePage');
const Header = require('../components/header');
const Sidebar = require('../components/sidebar');
const TableFooter = require('../components/tableFooter');

class TrucksPage extends BasePage {
    constructor(page) {
        super(page);
        this.header = new Header(page);
        this.sidebar = new Sidebar(page);
        this.tableFooter = new TableFooter(page);
        this.trucksTable = page.locator('table#trucks');
    }

    async verifyTrucksPage() {
        await expect(this.trucksTable).toBeVisible();
    }
}

module.exports = TrucksPage;
