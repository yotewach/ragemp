import { DataVehicle } from '../../../../browser/src/app/services/veiculo.service';
import { DataLogin, DataRegistration, ResultRecord } from '../../../../browser/src/interfaces/login.interface';
import { NellikaServer } from '../../../../common/nellika-server';
import { Player } from '../../../../common/database/models/Player';
import { environment } from '../../../../common/environment';
import { NellikaEvents } from '../../interfaces/nellika-events';
import { VoiceChatProvider } from '../../providers/voice-chat.provider';
import { Rpg } from '../../rpg';
import { playerEvent } from '../functions/player';

export class Events {
  protected brazucasServer: NellikaServer;

  constructor(brazucasServer: NellikaServer) {
    this.brazucasServer = brazucasServer;
  }

  public async [NellikaEvents.AUTENTICAR_JOGADOR](playerMp: PlayerMp, dados: DataLogin) {
    try {
      const player: Player = await this.brazucasServer.autenticarJogador(playerMp.name, dados.password);

      if (player) {
        playerMp.spawn(environment.posicaoLogin);

        await Rpg.playerProvider.update(playerMp, player.toJSON());

        return {
          eventoResposta: 'AuthenticationResult',
          credenciaisInvalidas: false,
          autenticado: true,
        };
      } else {
        return {
          eventoResposta: 'AuthenticationResult',
          credenciaisInvalidas: true,
          autenticado: false,
        };
      }
    } catch (err) {
      console.error(err.toString());

      return {
        eventoResposta: 'AuthenticationResult',
        credenciaisInvalidas: false,
        autenticado: false,
      };
    }
  }

  public async [NellikaEvents.REGISTRAR_JOGADOR](playerMp: PlayerMp, dados: DataRegistration) {
    try {
      const player: Player = await this.brazucasServer.registrarJogador(playerMp, dados);

      if (player) {
        playerMp.spawn(environment.posicaoLogin);

        playerEvent<ResultRecord>(playerMp, NellikaEvents.REGISTRO_RESULTADO, {
          error: false,
          player: player,
          registered: true,
        });
      } else {
        playerEvent<ResultRecord>(playerMp, NellikaEvents.REGISTRO_RESULTADO, {
          registered: false,
          error: true,
        });
      }
    } catch (err) {
      console.debug(`[REGISTRATION] An error occurred while creating the player ${playerMp.name}`);
      console.error(err.toString());

      playerEvent<ResultRecord>(playerMp, NellikaEvents.REGISTRO_RESULTADO, {
        registered: false,
        error: true,
        message: err.toString() || 'Internal error registering',
      });
    }
  }

  public async [NellikaEvents.CRIAR_VEICULO](playerMp: PlayerMp, data: DataVehicle) {
    try {
      await this.brazucasServer.criarVeiculo(playerMp, data);
    } catch (err) {
      console.debug(`[VEHICLES] An error occurred while creating the vehicle`);
      console.error(err.toString());

      return false;
    }
  }

  public async [NellikaEvents.HABILITAR_VOICE_CHAT](playerMp: PlayerMp, data: any) {
    console.log(`[VOICE CHAT] Enabling voice chat for ${playerMp.name} with the data: ${JSON.stringify(data)}`);

    const target = playerMp.players.at(data.targetId);

    if (!target) {
      return {
        erro: true,
        mensagem: 'Jogador não encontrado',
      };
    }

    VoiceChatProvider.habilitar(playerMp, target);
  }

  public async [NellikaEvents.DESABILITAR_VOICE_CHAT](player: PlayerMp, dados: any) {
    console.log(`[VOICE CHAT] Desativando voice chat para ${player.name} com os dados: ${JSON.stringify(dados)}`);

    const target = mp.players.at(dados.targetId);

    if (!target) {
      return {
        erro: true,
        mensagem: 'Jogador não encontrado',
      };
    }

    VoiceChatProvider.desabilitar(player, target);
  }

  public async [NellikaEvents.ANIMACAO_VOICE_CHAT](player: PlayerMp) {
    console.log(`[VOICE CHAT] Aplicando animação para ${player.name}`);

    player.playAnimation('special_ped@baygor@monologue_3@monologue_3e', 'trees_can_talk_4', 1, 0);
  }

  public async [NellikaEvents.VISUALIZAR_ANIMACAO](player: PlayerMp, dados: {
    pacote: string,
    nome: string;
  }) {
    player.stopAnimation();
    player.playAnimation(dados.pacote, dados.nome, 1, 0);
  }
}
