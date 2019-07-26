import { NellikaServer } from '../../../../common/nellika-server';
import { Rpg } from '../../rpg';

const HUNGER_DEFAULT_DECREASE = 1;
const THIRST_DEFAULT_DECREASE = 1;
const SLEEP_DEFAULT_DECREASE = 1;
const PHYSICAL_STRENGTH_DEFAULT_DECREASE = 1;

export class PlayerTimer {
  protected nellikaServer: NellikaServer;

  constructor(nellikaServer: NellikaServer) {
    this.nellikaServer = nellikaServer;

    setInterval(() => this.updateHunger(), 60000);
    setInterval(() => this.updateHead(), 45000);
    setInterval(() => this.refreshSleep(), 180000);
    setInterval(() => this.upgradePhysicalForce(), 200000);
  }

  private updateHunger() {
    mp.players.forEach(playerMp => {
      const nlkPlayer = Rpg.playerProvider.findFromMp(playerMp);

      const updatedValue = Math.max(nlkPlayer.storage.hunger - HUNGER_DEFAULT_DECREASE, 0);

      if (updatedValue === 0) {
        playerMp.health -= 1;
      }

      Rpg.playerProvider.update(playerMp, {
        hunger: updatedValue,
      });
    });
  }

  private updateHead() {
    mp.players.forEach(playerMp => {
      const nlkPlayer = Rpg.playerProvider.findFromMp(playerMp);

      const updatedValue = Math.max(nlkPlayer.storage.thirst - THIRST_DEFAULT_DECREASE, 0);

      if (updatedValue === 0) {
        nlkPlayer.storage.hunger -= 1;
      }

      Rpg.playerProvider.update(playerMp, {
        thirst: updatedValue,
      });
    });
  }

  private refreshSleep() {
    mp.players.forEach(playerMp => {
      const nlkPlayer = Rpg.playerProvider.findFromMp(playerMp);

      const updatedValue = Math.max(nlkPlayer.storage.sleep - SLEEP_DEFAULT_DECREASE, 0);

      if (updatedValue === 0) {
        // @All make the player sleep
      }

      Rpg.playerProvider.update(playerMp, {
        sleep: updatedValue,
      });
    });
  }

  private upgradePhysicalForce() {
    mp.players.forEach(playerMp => {
      const nlkPlayer = Rpg.playerProvider.findFromMp(playerMp);

      const updatedValue = Math.max(nlkPlayer.storage.physicalStrength - PHYSICAL_STRENGTH_DEFAULT_DECREASE, 0);

      if (updatedValue === 0) {
        // @What to do when you get to zero?
      }

      Rpg.playerProvider.update(playerMp, {
        physicalStrength: updatedValue,
      });
    });
  }
}
