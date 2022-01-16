describe('Farm CSV database', () => {
	it('Front page can be opened', () => {
		cy.visit('http://localhost:3006');

		cy.contains('Farm Data CSV Database');
	});

	it('A farm CSV file can be posted', () => {
		cy.fixture('testfarm.csv').then(fileContent => {
			cy.get('input[type="file"]').attachFile({
				fileContent: fileContent.toString(),
				fileName: 'testfarm.csv',
				mimeType: 'text/csv'
			});
		})
	});
});