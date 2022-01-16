describe('Farm CSV database', () => {
	it('Front page can be opened', () => {
		cy.visit('http://localhost:3006');

		cy.contains('Farm Data CSV Database');
	});

	it('A farm CSV file can be posted', () => {
		cy.get('input[name=fileInput]').type('Test Poster');
		cy.get('input[name=title]').type('Test Title Goes Here!');
		cy.get('textarea[name=content]').type('Lorem Ipsum Dolor');
		cy.get('button').click();

		cy.contains('Test Title Goes Here!');
	});
});


it('Testing picture uploading', () => {
	cy.fixture('testPicture.png').then(fileContent => {
			cy.get('input[type="file"]').attachFile({
					fileContent: fileContent.toString(),
					fileName: 'testfarm.csv',
					mimeType: 'text/csv'
			});
	});
});