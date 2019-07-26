import { NellikaServer } from '../../../../common/nellika-server';
import { VehicleProvider } from '../../providers/vehicle.provider';

export class VehiclesTimer {
  protected brazucasServer: NellikaServer;

  constructor(brazucasServer: NellikaServer) {
    this.brazucasServer = brazucasServer;

    setInterval(() => {
      this.updatePositions();
    }, 5000);
  }

  private updatePositions() {
    mp.vehicles.forEach((vehicle) => {
      VehicleProvider.park(vehicle);
    });
  }
}
