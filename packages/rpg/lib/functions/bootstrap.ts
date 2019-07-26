///<reference path="../../../../node_modules/@types/ragemp-s/index.d.ts" />

import { NellikaServer } from '../../../../common/nellika-server';
import { Vehicle } from '../../../../common/database/models/Vehicle';
import { Vehicles } from '../../../../common/util/vehicles';
import { VehicleProvider } from '../../providers/vehicle.provider';
import { PlayerTimer } from '../timers/player-timer';
import { VehiclesTimer } from '../timers/vehicles-timer';

declare const mp: Mp;

export async function carregarVeiculos() {
  let vehicles = await Vehicle.findAll();

  vehicles.forEach((vehicle) => {
    const vehicleMp = mp.vehicles.new(Vehicles[vehicle.model], new mp.Vector3(
      parseFloat(vehicle.positionX),
      parseFloat(vehicle.positionY),
      parseFloat(vehicle.positionZ)
    ));

    vehicleMp.setColorRGB(vehicle.corPrimariaR, vehicle.corPrimariaG, vehicle.corPrimariaB, vehicle.corSecundariaR,
      vehicle.corSecundariaG, vehicle.corSecundariaB);

    vehicleMp.locked = vehicle.trancado;
    vehicleMp.engine = vehicle.motor;
    // veiculoMp.dimension = veiculo.mundo;
    vehicleMp.numberPlate = vehicle.placaExibido;

    vehicleMp.spawn(vehicleMp.position, 0);

    VehicleProvider.vehicles.next({
      mp: vehicleMp,
      storage: vehicle,
    });
  });
}

export async function carregarTimers(brazucasServer: NellikaServer) {
  new VehiclesTimer(brazucasServer);
  new PlayerTimer(brazucasServer);
}
