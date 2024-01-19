import { getIframe } from "../functions/getIframe";
const BLOCKTYPE = 'core/query';
describe("Admin can login and open dashboard", () => {
	beforeEach(() => {
		cy.login();
	});

	it("Open dashboard", () => {
		cy.visit(`/wp-admin`);
		cy.get("h1").should("contain", "Dashboard");
	});

	it("Activate Curated Query Loop and deactivate it back", () => {
		cy.deactivatePlugin("query-loop-post-picker");
		cy.activatePlugin("query-loop-post-picker");
	});

	it("Create new post, add Curated Query Loop and add a post", () => {
		cy.createPost({});
		cy.get('.edit-post-header-toolbar__inserter-toggle').click();
		cy.contains('Curated Query Loop').click();
		cy.get('.edit-post-header-toolbar__inserter-toggle').click();
		// Assert that the block variation is inserted successfully and has approporiate class
		cy.get('body').then(() => {
			const iframe = getIframe('iframe[name="editor-canvas"]')
			iframe.find(`.wp-block[data-type="${BLOCKTYPE}"].has-no-posts`)
		});

		// Curate a post
		cy.openDocumentSettingsSidebar('Block')
		cy.get('.tenup-content-picker input').type('Hello World')
		cy.get('.block-editor-link-control__search-item').first().click()

		cy.get('body').then($body => {
			const iframe = getIframe('iframe[name="editor-canvas"]')
			iframe
				.find(`.wp-block[data-type="${BLOCKTYPE}"]`)
				.should('not.have.class', 'has-no-posts')
				.find('h2')
				.should('contain', 'Hello world!')
		});
	});
});
