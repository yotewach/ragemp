import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import * as Sequelize from 'sequelize';
import { DataVehicle } from '../browser/src/app/services/veiculo.service';
import { DataRegistration } from '../browser/src/interfaces/login.interface';
import { Database } from './database/database';
import { Player } from './database/models/Player';
import { Vehicle } from './database/models/Vehicle';
import { PLAYER_NAME_MAXLENGTH, PLAYER_NAME_MINLENGTH, PLAYER_NAME_REGEXP } from './interfaces';
import { bcryptCompare, bcryptHash, hexToRgb, onlyNumbers } from './util/util';
import { Vehicles } from './util/vehicles';
import Bluebird = require('bluebird');

export class NellikaServer {
  private database: Database;
  public isReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.database = new Database();
  }

  public onload(): Observable<any> {
    const fork = forkJoin(
      ...[
        this.database.sync(),
        this.database.authenticate(),
      ],
    );

    fork.subscribe(() => this.isReady.next(true));

    return fork;
  }

  public loadPlayer(playerName: string): Bluebird<Player> {
    return Player.findOne({
      ['where' as any]: {
        nome: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nome')), '=', playerName.toLowerCase())
      }
    });
  }

  public async autenticarJogador(playerName: string, password: string): Promise<Player> {
    const player = await this.loadPlayer(playerName);

    if (!player) {
      throw 'Player not found';
    }

    const authenticated = await bcryptCompare(password, player.password);

    return authenticated ? player : null;
  }

  public async registrarJogador(playerMp: PlayerMp, data: DataRegistration): Promise<Player> {
    console.debug(`[REGISTRATION] New Player ${playerMp.name}`);

    if (
      !data.passwordConfirm || !data.password || !data.phone || !data.email ||
      !data.passwordConfirm.length || !data.password.length || !data.phone.length || !data.email.length
    ) {
      throw 'All fields must be entered.';
    }

    if (data.password !== data.passwordConfirm) {
      throw 'Passwords entered differ';
    }

    const playerNameClean = PLAYER_NAME_REGEXP.exec(playerMp.name);

    if (
      !playerNameClean ||
      (playerNameClean[1].length !== playerMp.name.length) ||
      playerMp.name.length < PLAYER_NAME_MINLENGTH ||
      playerMp.name.length > PLAYER_NAME_MAXLENGTH
    ) {
      throw 'Name is not allowed';
    }

    const existPlayer = await this.loadPlayer(playerMp.name);

    if (existPlayer) {
      throw 'There is already a registered player with this nickname';
    }

    console.debug(`[REGISTRATION] Creating player ${playerMp.name}`);

    const passwordHash = await bcryptHash(data.password);

    const player = new Player({
      name: playerMp.name,
      password: (passwordHash as string),
      level: 1,
      email: data.email,
      phone: onlyNumbers(data.phone),
    });

    return player.save();
  }

  public async criarVeiculo(player: PlayerMp, dataVehicle: DataVehicle): Promise<any> {
    console.debug(`[CREATE VEHICLE] New vehicle created by ${player.name}`);

    if (!Vehicles[dataVehicle.model]) {
      throw 'Model not found';
    }

    const rgbPrimary = hexToRgb(dataVehicle.colorPrimary);
    const rgbSecondary = hexToRgb(dataVehicle.colorSecondary);

    const playerData = await this.loadPlayer(player.name);

    if (!playerData) {
      throw 'Player not found';
    }

    const vehicle = new Vehicle({
      originalBoard: dataVehicle.board,
      boardDisplayed: dataVehicle.board,
      model: dataVehicle.model,
      positionX: dataVehicle.positionX,
      positionY: dataVehicle.positionY,
      positionZ: dataVehicle.positionZ,
      originalPositionX: dataVehicle.positionX,
      originalPositionY: dataVehicle.positionY,
      originalPositionZ: dataVehicle.positionZ,
      rotation: 0,
      transparency: dataVehicle.transparency,
      colorPrimaryR: rgbPrimary.r,
      colorPrimaryG: rgbPrimary.g,
      colorPrimaryB: rgbPrimary.b,
      colorSecondaryR: rgbSecondary.r,
      colorSecondaryG: rgbSecondary.g,
      colorSecondaryB: rgbSecondary.b,
      locked: dataVehicle.locked,
      motor: dataVehicle.motor,
      world: 0,
      originalValue: dataVehicle.originalValue,
      saleValue: dataVehicle.saleValue,
      forSale: dataVehicle.forSale,
      playerVehicle: playerData,
    });

    await vehicle.save();

    const vehicleMp = mp.vehicles.new(Vehicles[dataVehicle.model],
      new mp.Vector3(parseFloat(dataVehicle.positionX), parseFloat(dataVehicle.positionY), parseFloat(dataVehicle.positionZ)));

    vehicleMp.engine = dataVehicle.motor;
    vehicleMp.locked = dataVehicle.transparency;
    vehicleMp.setColorRGB(rgbPrimary.r, rgbPrimary.g, rgbPrimary.b, rgbSecundaria.r, rgbSecundaria.g, rgbSecundaria.b);
    vehicleMp.numberPlate = dataVehicle.board;
    vehicleMp.alpha = dataVehicle.transparency;

    vehicleMp.spawn(vehicleMp.position, 0);

    return true;
  }
}
