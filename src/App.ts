// Imports
import * as express from 'express';
import * as mongoose from 'mongoose';
import { BattleRoutes } from './battles/battle.routes';
import { Server } from './config/serverConfig';

// Class definition
class App {
	// Public variables
	public express: express.Application;
	public battleRoutes: BattleRoutes = new BattleRoutes();

	// Constructor
	constructor () {
		// Create an express instance
		this.express = express();

		// Specify routes for it to use
		this.configureRoutes(express);

		// Configure mongoose
		this.configureMongoose();
	}

	// Private methods
	configureRoutes(pExpress: express.Application): void {
		// Specify battle routes
		this.battleRoutes.routes(this.express);
	}

	configureMongoose(): void {
		// No idea what this does?
		mongoose.Promise = global.Promise;

		// Connect to DB
		mongoose.connect(Server.dbUrl)
			.then(() => console.log('Connected to MongoDB'))
			.catch((err) => {
				console.log('Unable to connect to MongoDB');
				console.log(err);
			});
	}
}

// Export
export default new App().express;
