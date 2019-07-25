import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import * as Sequelize from 'sequelize';
import { DadosVeiculo } from '../browser/src/app/services/veiculo.service';
import { DadosRegistro } from '../browser/src/interfaces/login.interface';
import { Database } from './database/database';
import { Jogador } from './database/models/Player';
import { Veiculo } from './database/models/Vehicle';
import { PLAYER_NAME_MAXLENGTH, PLAYER_NAME_MINLENGTH, PLAYER_NAME_REGEXP } from './interfaces';
import { bcryptCompare, bcryptHash, hexToRgb, soNumeros } from './util/util';
import { Veiculos } from './util/vehicles';
import Bluebird = require('bluebird');

export class BrazucasServer {
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

  public loadPlayer(playerName: string): Bluebird<Jogador> {
    return Jogador.findOne({
      ['where' as any]: {
        nome: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nome')), '=', playerName.toLowerCase())
      }
    });
  }

  public async autenticarJogador(playerName: string, senha: string): Promise<Jogador> {
    const jogador = await this.loadPlayer(playerName);

    if (!jogador) {
      throw 'Player not found';
    }

    const autenticado = await bcryptCompare(senha, jogador.senha);

    return autenticado ? jogador : null;
  }

  public async registrarJogador(player: PlayerMp, dados: DadosRegistro): Promise<Jogador> {
    console.debug(`[REGISTRATION] New Player ${player.name}`);

    if (
      !dados.senhaConfirma || !dados.senha || !dados.celular || !dados.email ||
      !dados.senhaConfirma.length || !dados.senha.length || !dados.celular.length || !dados.email.length
    ) {
      throw 'All fields must be entered.';
    }

    if (dados.senha !== dados.senhaConfirma) {
      throw 'Passwords entered differ';
    }

    const playerNameClean = PLAYER_NAME_REGEXP.exec(player.name);

    if (
      !playerNameClean ||
      (playerNameClean[1].length !== player.name.length) ||
      player.name.length < PLAYER_NAME_MINLENGTH ||
      player.name.length > PLAYER_NAME_MAXLENGTH
    ) {
      throw 'Name is not allowed';
    }

    const jogadorExistente = await this.loadPlayer(player.name);

    if (jogadorExistente) {
      throw 'There is already a registered player with this nickname';
    }

    console.debug(`[REGISTRATION] Creating player ${player.name}`);

    const senhaHash = await bcryptHash(dados.senha);

    const jogador = new Jogador({
      nome: player.name,
      senha: (senhaHash as string),
      nivel: 1,
      email: dados.email,
      celular: soNumeros(dados.celular),
    });

    return jogador.save();
  }

  public async criarVeiculo(player: PlayerMp, dataVehicle: DadosVeiculo): Promise<any> {
    console.debug(`[CREATE VEHICLE] New vehicle created by ${player.name}`);

    if (!Veiculos[dataVehicle.modelo]) {
      throw 'Model not found';
    }

    const rgbPrimaria = hexToRgb(dataVehicle.corPrimaria);
    const rgbSecundaria = hexToRgb(dataVehicle.corSecundaria);

    const jogador = await this.loadPlayer(player.name);

    if (!jogador) {
      throw 'Player not found';
    }

    const vehicle = new Veiculo({
      placaOriginal: dataVehicle.placa,
      placaExibido: dataVehicle.placa,
      modelo: dataVehicle.modelo,
      posicaoX: dataVehicle.posicaoX,
      posicaoY: dataVehicle.posicaoY,
      posicaoZ: dataVehicle.posicaoZ,
      posicaoOriginalX: dataVehicle.posicaoX,
      posicaoOriginalY: dataVehicle.posicaoY,
      posicaoOriginalZ: dataVehicle.posicaoZ,
      rotacao: 0,
      transparencia: dataVehicle.transparencia,
      corPrimariaR: rgbPrimaria.r,
      corPrimariaG: rgbPrimaria.g,
      corPrimariaB: rgbPrimaria.b,
      corSecundariaR: rgbSecundaria.r,
      corSecundariaG: rgbSecundaria.g,
      corSecundariaB: rgbSecundaria.b,
      trancado: dataVehicle.trancado,
      motor: dataVehicle.motor,
      mundo: 0,
      valorOriginal: dataVehicle.valorOriginal,
      valorVenda: dataVehicle.valorVenda,
      aVenda: dataVehicle.aVenda,
      jogadorVeiculo: jogador,
    });

    await vehicle.save();

    const veiculoMp = mp.vehicles.new(Veiculos[dataVehicle.modelo],
      new mp.Vector3(parseFloat(dataVehicle.posicaoX), parseFloat(dataVehicle.posicaoY), parseFloat(dataVehicle.posicaoZ)));

    veiculoMp.engine = dataVehicle.motor;
    veiculoMp.locked = dataVehicle.trancado;
    veiculoMp.setColorRGB(rgbPrimaria.r, rgbPrimaria.g, rgbPrimaria.b, rgbSecundaria.r, rgbSecundaria.g, rgbSecundaria.b);
    veiculoMp.numberPlate = dataVehicle.placa;
    veiculoMp.alpha = dataVehicle.transparencia;

    veiculoMp.spawn(veiculoMp.position, 0);

    return true;
  }
}
