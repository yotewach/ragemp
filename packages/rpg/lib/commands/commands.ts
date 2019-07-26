///<reference path="../../../../node_modules/@types/ragemp-s/index.d.ts" />

import { NellikaServer } from '../../../../common/nellika-server';
import { NellikaEvents } from '../../interfaces/nellika-events';
import { playerEvent } from '../functions/player';
import { ComandosAdmin } from './comandos-admin';

export class Commands extends ComandosAdmin {

  constructor(nellikaServer: NellikaServer) {
    super(nellikaServer);
  }

  public dararma(player: PlayerMp, weaponHash: string) {
    console.debug(`[COMMANDS - dararma] Giving weapon ${weaponHash} for the player ${player.name}`);

    const asset = mp.joaat(weaponHash);

    player.giveWeapon(asset, 1000);

    player.notify(`Weapon ${weaponHash} received!`);
  }

  public posicaoatual(player: PlayerMp) {
    console.debug(`[COMMANDS - current position] Current position for ${player.name}: ${player.position.toString()}`);

    player.outputChatBox(`Posição atual: ${player.position.toString()}`);
  }

  public browser(player: PlayerMp) {
    playerEvent<any>(player, NellikaEvents.INICIAR_NAVEGADOR);
  }

  public cursor(player: PlayerMp) {
    playerEvent<any>(player, NellikaEvents.CURSOR);
  }
}
