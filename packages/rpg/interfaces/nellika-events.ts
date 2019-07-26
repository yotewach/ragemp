export enum NellikaEvents {
  BROWSER = 'browser',
  SERVER = 'server',
  AUTENTICAR_JOGADOR = 'AuthenticatePlayer',
  CRIAR_VEICULO = 'CreateVehicle',
  REGISTRAR_JOGADOR = 'RegisterPlayer',
  AUTENTICACAO_RESULTADO = 'AuthenticationResult',
  REGISTRO_RESULTADO = 'RecordResult',
  DADOS_JOGADOR = 'DicePlayer',
  ATUALIZAR_DADOS_JOGADOR = 'UpdateDataPlayer',
  INICIAR_NAVEGADOR = 'StartNavigator',
  CURSOR = 'cursor',
  HABILITAR_VOICE_CHAT = 'EnableVoiceChat',
  DESABILITAR_VOICE_CHAT = 'DisableVoiceChat',
  ANIMACAO_VOICE_CHAT = 'AnimationVoiceChat',
  ATUALIZAR_FOME = 'UpdateHunger',
  ATUALIZAR_SEDE = 'UpdateHead',
  ATUALIZAR_SONO = 'UpdateSleep',
  ATUALIZAR_FORCA_FISICA = 'UpgradePhysicalStrength',
  VISUALIZAR_ANIMACAO = 'ViewAnimation',
}

export interface ServerEvent<T> {
  eventId?: number,
  event: string,
  data: T,
}
