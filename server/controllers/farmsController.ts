const knex = require('../db');
import { Request, Response } from 'express';
import { Farm, Measurement } from '../../types';

exports.getFarms = (req: Request, res: Response) => {
	knex('farms')
		.distinct('name')
		.then((data: Farm[]) => {
			res.json(data);
		})
		.catch((e: Error) => {
			res.json({ message: `Error retrieving farm names: ${e.message}` });
		});
};

exports.getFarm = (req: any, res: Response) => {
	const farmName = req.params?.name;
	knex
		.select('*')
		.from('farms')
		.where('name', farmName)
		.then((data: Measurement[]) => {
			res.json(data);
		})
		.catch((e: Error) => {
			res.json({ message: `Error retrieving farm: ${e.message}` });
		});
};

exports.getAllData = (_req: Request, res: Response) => {
	knex
		.select('*')
		.from('farms')
		.then((data: Measurement[]) => {
			res.json(data);
		})
		.catch((e: Error) => {
			res.json({ message: `Error retrieving farms: ${e.message}` });
		});
};

exports.farmCreate = async (req: { file: { buffer: { toString: (arg0: string) => any } } }, res: Response) => {
	// Save each line in the CSV file into an array.
	const bufferToString = req.file?.buffer.toString('utf8');
	const lines = bufferToString?.split('\n');
	const records: Measurement[] = [];

	// Split each line/row by a comma or tab symbol.
	lines?.forEach((line: string) => {
		const row = line.split(/[,|\t]/);
		const newMeasurement = {
			name: row[0],
			date: new Date(row[1]),
			metricType: row[2],
			metricValue: parseInt(row[3])
		};
		// Filter out objects derived from bad lines.
		if (newMeasurement.date && newMeasurement.metricValue) {
			records.push(newMeasurement);
		}
	});

	// Save new measurement objects into the db in batches.
	try {
		await knex.batchInsert('farms', records, 100);
		res.send('File uploaded successfully.');
	} catch (e) {
		if (e instanceof Error) res.json({ message: `Error creating farm: ${e.message}` });
	}
};

exports.farmsDelete = async (req: any, res: Response) => {
	const farmName = req.query?.name;
	await knex('farms')
		.where('name', farmName)
		.del()
		.then(() => {
			res.json({ message: `Farm ${farmName} deleted.` });
		})
		.catch((e: Error) => {
			res.json({ message: `Error deleting ${farmName} farm: ${e.message}` });
		});
};

exports.farmsReset = async (_req: Request, res: Response) => {
	await knex
		.select('*')
		.from('farms')
		.truncate()
		.then(() => {
			res.json({ message: 'Farm list cleared.' });
		})
		.catch((e: Error) => {
			res.json({ message: `Error resetting farm list: ${e.message}.` });
		});
};
