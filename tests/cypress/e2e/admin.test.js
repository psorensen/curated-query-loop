import { getIframe } from "../functions/getIframe";
const BLOCKTYPE = 'core/query';
describe("Admin can login and open dashboard", () => {
	beforeEach(() => {
		cy.on("uncaught:exception", (err, runnable) => {
			return false;
		});

		cy.visit(`/wp-admin`);
		// if page contains "Update WordPress Database" button, click it
		cy.get(".button").then(($btn) => {
			if ($btn.text().includes("Update WordPress Database")) {
				cy.get(".button").click();
			}
		});

		cy.login();
	});

	it("Open dashboard", () => {
		cy.visit(`/wp-admin`);
		cy.get("h1").should("contain", "Dashboard");
	});

	it("Activate Curated Query Loop and deactivate it back", () => {
		cy.deactivatePlugin("curated-query-loop");
		cy.activatePlugin("curated-query-loop");
	});

	it("Create new post, add Curated Query Loop and add a post", () => {
		cy.createPost({});
		cy.get('.edit-post-header-toolbar__inserter-toggle').click();
		cy.contains('Curated Query Loop').click();
		cy.get('.edit-post-header-toolbar__inserter-toggle').click();
		// Assert that the block variation is inserted successfully and has approporiate class

		cy.get('body').then($body => {
			if ($body.find('iframe[name="editor-canvas"]').length) {
				const iframe = getIframe('iframe[name="editor-canvas"]')
				iframe.find(`.wp-block[data-type="${BLOCKTYPE}"].has-no-posts`)
			} else {
				cy.get(`.wp-block[data-type="${BLOCKTYPE}"].has-no-posts`)
			}
		});

		// Curate a post
		cy.openDocumentSettingsSidebar('Block')
		cy.get('.tenup-content-picker input').type('Et sit perspiciatis architecto consequatur sit')
		cy.get('.block-editor-link-control__search-item').first().click()

		cy.get('body').then($body => {
			if ($body.find('iframe[name="editor-canvas"]').length) {
				const iframe = getIframe('iframe[name="editor-canvas"]')
				iframe
					.find(`.wp-block[data-type="${BLOCKTYPE}"]`)
					.should('not.have.class', 'has-no-posts')
					.find('h2')
					.should('contain', 'Et sit perspiciatis architecto consequatur sit')
			} else {
				cy.get(`.wp-block[data-type="${BLOCKTYPE}"]`)
					.should('not.have.class', 'has-no-posts')
					.find('h2')
					.should('contain', 'Et sit perspiciatis architecto consequatur sit')
			}
		});
	});
});
