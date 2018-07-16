"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express = require("express");
const mongoose = require("mongoose");
const battle_routes_1 = require("./battles/battle.routes");
const serverConfig_1 = require("./config/serverConfig");
// Class definition
class App {
    // Constructor
    constructor() {
        this.battleRoutes = new battle_routes_1.BattleRoutes();
        // Create an express instance
        this.express = express();
        // Specify routes for it to use
        this.configureRoutes(express);
        // Configure mongoose
        this.configureMongoose();
    }
    // Private methods
    configureRoutes(pExpress) {
        // Specify battle routes
        this.battleRoutes.routes(this.express);
    }
    configureMongoose() {
        // No idea what this does?
        mongoose.Promise = global.Promise;
        // Connect to DB
        mongoose.connect(serverConfig_1.Server.dbUrl)
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => {
            console.log('Unable to connect to MongoDB');
            console.log(err);
        });
    }
}
// Export
exports.default = new App().express;
//# sourceMappingURL=App.js.map