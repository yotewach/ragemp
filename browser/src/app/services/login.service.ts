import { Injectable } from '@angular/core';
import { BrazucasEventos } from '../../../../packages/rpg/interfaces/brazucas-eventos';
import { AuthenticationResult, DataLogin, DataRegistration, ResultRecord } from '../../interfaces/login.interface';
import { RagempService } from './ragemp.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public ragemp: RagempService) {
    if (!window) {
      (window as any) = {};
    }

    (window as any).my = window || {};
    (window as any).login = (window as any).ragemp || {};
  }

  public login(data: DataLogin): Promise<AuthenticationResult> {
    return this.ragemp.callRagempEvent(BrazucasEventos.AUTENTICAR_JOGADOR, data);
  }

  public registrar(data: DataRegistration): Promise<ResultRecord> {
    return this.ragemp.callRagempEvent(BrazucasEventos.REGISTRAR_JOGADOR, data);
  }
}
