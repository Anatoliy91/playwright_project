class TableFooter {
    constructor(page) {
        this.page = page;
        this.tableFooter = page.locator('footer.table-footer');
    }

    async goToNextPage() {
        await this.page.click('button.next-page');
    }

    async goToPreviousPage() {
        await this.page.click('button.previous-page');
    }
}

module.exports = TableFooter;
