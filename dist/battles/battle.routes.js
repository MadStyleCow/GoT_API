"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const battle_controller_1 = require("./battle.controller");
// Class body
class BattleRoutes {
    constructor() {
        // Public variables
        this.battleController = new battle_controller_1.BattleController();
    }
    // Public methods
    routes(app) {
        // So, we need to create a couply of end-points
        // Lists all battles
        app.route('/list')
            .get(this.battleController.getBattles);
        // Returns the total amount of battles
        app.route('/count')
            .get(this.battleController.countBattles);
        // Returns battle statistics
        app.route('/stats')
            .get(this.battleController.getBattleStatistics);
        // Returns a list of battles matching the specified query
        app.route('/search')
            .get(this.battleController.queryBattles);
    }
}
exports.BattleRoutes = BattleRoutes;
;
//# sourceMappingURL=battle.routes.js.map