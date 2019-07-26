import { Injectable } from '@angular/core';
import { NellikaEvents } from '../../../../packages/rpg/interfaces/nellika-events';
import { AuthenticationResult } from '../../interfaces/login.interface';
import { RagempService } from './ragemp.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(public ragemp: RagempService) {
  }

  public criarVeiculo(dados: DataVehicle): Promise<AuthenticationResult> {
    return this.ragemp.callRagempEvent(NellikaEvents.CRIAR_VEICULO, dados);
  }
}

export interface DataVehicle {
  model: string,
  colorPrimary: string,
  colorSecondary: string,
  board: string,
  owner: string,
  positionX: string,
  positionY: string,
  positionZ: string,
  locked: boolean,
  motor: boolean,
  transparency: number,
  size: string,
  originalValue: number,
  saleValue: number,
  forSale: boolean,
}
