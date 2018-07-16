// Imports
import { Request, Response, NextFunction } from 'express';
import { BattleController } from './battle.controller';

// Class body
export class BattleRoutes {
  // Public variables
  public battleController: BattleController = new BattleController();

  // Public methods
  public routes(app): void {
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

};