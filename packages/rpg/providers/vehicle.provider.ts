import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MpVehicleColorInterface } from '../interfaces/mp.vehicle-corlor.interface';
import { RPGVehicle } from '../interfaces/vehicle.interface';

export class VehicleProvider {
  private static vehiclesStored: Array<RPGVehicle> = [];
  public static vehicles: BehaviorSubject<RPGVehicle> = new BehaviorSubject(null);

  public static findFromMp(vehicle: VehicleMp) {
    return VehicleProvider.vehiclesStored.find((rpgVehicle) => rpgVehicle.mp === vehicle);
  }

  public static salvar(vehicle: VehicleMp) {
    return new Observable((resolver) => {
      let rpgVehicle = VehicleProvider.findFromMp(vehicle);

      if (rpgVehicle) {
        rpgVehicle.storage.boardDisplayed = vehicle.numberPlate;
        rpgVehicle.storage.locked = vehicle.locked;
        [rpgVehicle.storage.colorPrimaryR, rpgVehicle.storage.colorPrimaryG, rpgVehicle.storage.colorPrimaryB] = vehicle.getColorRGB(MpVehicleColorInterface.PRIMARIA);
        [rpgVehicle.storage.colorSecondaryR, rpgVehicle.storage.colorSecondaryG, rpgVehicle.storage.colorSecondaryB] = vehicle.getColorRGB(MpVehicleColorInterface.SECUNDARIA);
        rpgVehicle.storage.model = vehicle.model.toString();
        rpgVehicle.storage.motor = vehicle.engine;
        rpgVehicle.storage.world = vehicle.dimension;
        rpgVehicle.storage.rotation = vehicle.heading;
        rpgVehicle.storage.transparency = vehicle.alpha;

        resolver.next(rpgVehicle.storage.save());
        resolver.complete();
      } else {
        resolver.error(`[VehicleProvider - Save] Vehicle ID ${vehicle.id} not found on stored vehicles.`);
      }
    });
  }

  public static park(vehicle: VehicleMp) {
    return new Observable((resolver) => {
      let rpgVehicle = VehicleProvider.findFromMp(vehicle);

      if (rpgVehicle) {
        rpgVehicle.storage.positionX = vehicle.position.x.toString();
        rpgVehicle.storage.positionY = vehicle.position.y.toString();
        rpgVehicle.storage.positionZ = vehicle.position.z.toString();
        rpgVehicle.storage.rotation = vehicle.heading;

        resolver.next(rpgVehicle.storage.save());
        resolver.complete();
      } else {
        resolver.error(`[VehicleProvider - Park] Vehicle ID ${vehicle.id} not found on stored vehicles.`);
      }
    });
  }

  public init() {
    VehicleProvider.vehicles.subscribe((rpgVeiculo) => {
      VehicleProvider.vehiclesStored.push(rpgVeiculo);
    });
  }
}
