// Imports
import * as mongoose from 'mongoose';
import { BattleSchema } from './battle.model';
import { Request, Response } from 'express';

const Battle: mongoose.Model = mongoose.model('Battle', BattleSchema, 'Battle');

// Class body
export class BattleController {
	// Public methods
	// Get battles
	public getBattles(req: Request, res: Response): void {
		// Find all batles
		Battle.find({}, (err, battles) => {
			// Have any errors occured?
			if (err) {
				// Return an error
				res.send(err);
			}

			// Othewise, return the requested data
			res.json(battles);
		});
	};

	// Count battles
	public countBattles(req: Request, res: Response): void {
		// Find all batles
		Battle.count({}, (err, battleCount) => {
			// Have any errors occured?
			if (err) {
				// Return an error
				res.send(err);
			}

			// Othewise, return the requested data
			res.json(battleCount);
		});
	};

	// Query battles
	public queryBattles(req: Request, res: Response): void {
		// Construct query
		let query = Battle.find();

		// Iterate through all of the query parameters we have
		for (let key in req.query) {
			// Don't forget, we have a few special cases
			// You could probably do it in a better way (translation table? alternate names in the ORM?)
			switch (key) {
				// Which is king
				case 'king':
					query.or([{'attacker_king': req.query.king}, {'defender_king': req.query.king}])
					break;

				// And type
				case 'type':
					query.where('battle_type', req.query[key]);
					break;

				default:
					query.where(key, req.query[key]);
					break;
			}
		};

		// Find all batles that match the specified parameters
		Battle.find(query, (err, battles) => {
			// Have any errors occured?
			if (err) {
				// Return an error
				res.send(err);
			}
			
			// Othewise, return the requested data
			res.json(battles);
		});
	};

	// Battle statitics
	public getBattleStatistics(req: Request, res: Response): void {
		// At this point, we should get some statistics.
		// The problem is, you can't get them with a single request.
		// Therefore, we should order multiple requests, wait for all of them to finish
		// And then return a composite object. And whats this, mongoose supports promises..
		// The result should look like this:
		/*
		{
			"most_active":{
				"attacker_king": "xxx",
				"defender_king": "xxx",
				"region": "xxx"
			},
			"attacker_outcome":{
				"win": 1000, // total win
				"loss": 1000 // total loss
			},
			"battle_type":[], // unique battle types
			"defender_size":{
				"average": 10,
				"min": 5,
				"max": 100
			}
		}
		*/
		// I'll be honest, I spent two hours trying to understand the aggregate methods
		// Then i found the SQL mapping table and it became so clear..

		// Create a promise array
		let promiseArray = [];

		// Active king
		promiseArray.push(Battle.aggregate([
			{
				$match: {
					"attacker_king": { "$exists": true, "$ne": '' },
					"defender_king": { "$exists": true, "$ne": '' },
					"region": { "$exists": true, "$ne": '' }
				}
			},
			{
				$group: {
					_id: {
						attacker_king: "$attacker_king",
						defender_king: "$defender_king",
						region: "$region"
					},
					count: { $sum: 1 }
				}
			},
			{
				$sort: { 
					count: -1 
				}
			},
			{
				$limit: 1
			}
		]).exec());

		// Attacker outcome
		promiseArray.push(Battle.aggregate([
		{
			$match: {
				"attacker_outcome": { "$exists": true, "$ne": '' }
			}
		},
		{
			$group: {
				_id: "$attacker_outcome",
				count: { $sum: 1 }
			}
		}
		]).exec());

		// Battle types
		promiseArray.push(Battle.distinct("battle_type", 
			{ 
				"battle_type" : 
					{ 
						$nin : ["", null]
					}
			}).exec());

		// Get defender size aggregates & push into array
		promiseArray.push(Battle.aggregate([
		{
			$match: {
				"defender_size": { "$exists": true, "$ne": '' }
			}
		},
		{
			$group: {
				_id: null,
				average: { $avg: "$defender_size" },
				min: { $min: "$defender_size" },
				max: { $max: "$defender_size" }
			}
		}
		]).exec());

		// Wait for all promimses to complete
		Promise.all(promiseArray)
			.then((promiseData) => {
				// Create shortcuts
				const mostActive = promiseData[0][0]['_id'];
				const attackerOutcome = promiseData[1];
				const battleTypes = promiseData[2];
				const defenderSize = promiseData[3][0];

				// Create a composite object
				const compositeObject: object = {
					'most_active': {
						'attacker_king': mostActive.attacker_king,
						'defender_king': mostActive.defender_king,
						'region': mostActive.region
					},
					'attacker_outcome': {
						'win': attackerOutcome[1].count,
						'loss': attackerOutcome[0].count
					},
					'battle_type': [...battleTypes],
					'defender_size': {
						'average': Math.floor(defenderSize.average),	// Floor it to eliminate fractions
						'min': defenderSize.min,
						'max': defenderSize.max
					}
				};

				// Return it
				res.json(compositeObject);
			})
			.catch((err) => {
				// If any of the promises fail - send back a failed response
				res.send(err);
			})

	};
};