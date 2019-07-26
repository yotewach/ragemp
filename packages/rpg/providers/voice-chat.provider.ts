export class VoiceChatProvider {
  public static habilitar(player: PlayerMp, target: PlayerMp) {
    console.debug(`[VOICE CHAT] Enabling voice chat from ${player.name} for ${target.name}`);
    player.enableVoiceTo(target);
  }

  public static desabilitar(player: PlayerMp, target: PlayerMp) {
    console.debug(`[VOICE CHAT] Disabling voice chat from ${player.name} for ${target.name}`);
    player.disableVoiceTo(target);
  }
}
