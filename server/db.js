const path = require('path');
// Get location of database.sqlite file.
const dbPath = path.resolve(__dirname, 'db/database.sqlite');
// Connect to SQLite database.
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
});

knex.schema
  .hasTable('farms')
    .then(async (exists) => {
      if (!exists) {
        try {
					await knex.schema.createTable('farms', (table) => {
						table.increments('id').primary();
						table.string('name');
						table.string('date');
						table.string('metricType');
						table.integer('metricValue');
					});
					console.log('Table \'Farms\' created');
				} catch (error) {
					console.error(`There was an error creating table: ${error}`);
				}
      }
    })
    .then(() => {
      console.log('Database ready!');
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`);
    });
module.exports = knex;
