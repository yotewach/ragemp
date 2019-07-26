import { NellikaEvents, ServerEvent } from '../../interfaces/nellika-events';

export function notifyAll(text: string) {
  mp.players.forEach(player => player.notify(text));
}

export function playerEvent<T>(player: PlayerMp, event: string, data?: T, eventId?: number) {
  console.debug(`[PLAYER EVENT] ${player.name} called the event ${event} (ID ${eventId}) with the following data: ${JSON.stringify(data)}`);

  player.call(NellikaEvents.SERVER, [<ServerEvent<T>> {
    eventId: eventId,
    event: event,
    data: data,
  }]);
}

export function playersEvent<T>(event: string, data?: T, eventId?: number) {
  console.debug(`[ALL PLAYER EVENT] Event ${event} (ID ${eventId}) with the following data: ${JSON.stringify(data)} fired to ${mp.players.length} jogadores.`);

  mp.players.call(NellikaEvents.SERVER, [<ServerEvent<T>> {
    eventId: eventId,
    event: event,
    data: data,
  }]);
}
