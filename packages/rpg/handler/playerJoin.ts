import { BrazucasServer } from '../../../common/brazucas-server';
import { Player } from '../../../common/database/models/Player';
import { BrazucasEventos } from '../interfaces/brazucas-eventos';
import { notificarTodos, playerEvent } from '../lib/functions/player';
import { Rpg } from '../rpg';

export function PlayerJoinHandler(brazucasServer: BrazucasServer, player: PlayerMp) {
  console.debug(`[ENTER] ${player.name} entered the server (${player.ip})`);

  notificarTodos(`~y~${player.name} ~w~entered the server`);

  const subscribe = brazucasServer.isReady.subscribe(async () => {
    const playerProfile = await brazucasServer.loadPlayer(player.name);

    if (playerProfile) {
      console.debug(`[LOAD PLAYER] Player ${playerProfile.name} loaded`);
    } else {
      console.debug('[LOAD PLAYER] Player not found');
    }


    Rpg.playerProvider.addPlayer({
      mp: player,
      storage: playerProfile,
    });

    playerEvent<Player>(player, BrazucasEventos.DADOS_JOGADOR, playerProfile.toJSON());
    subscribe.unsubscribe();
  });
}
