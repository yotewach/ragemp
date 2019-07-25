"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/of");
const forkJoin_1 = require("rxjs/internal/observable/forkJoin");
const Sequelize = require("sequelize");
const database_1 = require("./database/database");
const Jogador_1 = require("./database/models/Jogador");
const Veiculo_1 = require("./database/models/Veiculo");
const interfaces_1 = require("./interfaces");
const util_1 = require("./util/util");
const vehicles_1 = require("./util/vehicles");
class BrazucasServer {
    constructor() {
        this.isReady = new rxjs_1.BehaviorSubject(false);
        this.database = new database_1.Database();
    }
    onload() {
        const fork = forkJoin_1.forkJoin(...[
            this.database.sync(),
            this.database.authenticate(),
        ]);
        fork.subscribe(() => this.isReady.next(true));
        return fork;
    }
    loadPlayer(playerName) {
        return Jogador_1.Jogador.findOne({
            ['where']: {
                nome: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nome')), '=', playerName.toLowerCase())
            }
        });
    }
    autenticarJogador(playerName, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const jogador = yield this.loadPlayer(playerName);
            if (!jogador) {
                throw 'Player not found';
            }
            const autenticado = yield util_1.bcryptCompare(senha, jogador.senha);
            return autenticado ? jogador : null;
        });
    }
    registrarJogador(player, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug(`[REGISTRATION] New Player ${player.name}`);
            if (!data.senhaConfirma || !data.senha || !data.celular || !data.email ||
                !data.senhaConfirma.length || !data.senha.length || !data.celular.length || !data.email.length) {
                throw 'All fields must be entered.';
            }
            if (data.senha !== data.senhaConfirma) {
                throw 'Passwords entered differ';
            }
            const playerNameClean = interfaces_1.PLAYER_NAME_REGEXP.exec(player.name);
            if (!playerNameClean ||
                (playerNameClean[1].length !== player.name.length) ||
                player.name.length < interfaces_1.PLAYER_NAME_MINLENGTH ||
                player.name.length > interfaces_1.PLAYER_NAME_MAXLENGTH) {
                throw 'Name not allowed';
            }
            const jogadorExistente = yield this.loadPlayer(player.name);
            if (jogadorExistente) {
                throw 'There is already a registered player with this nickname';
            }
            console.debug(`[REGISTRATION] Creating player ${player.name}`);
            const senhaHash = yield util_1.bcryptHash(data.senha);
            const jogador = new Jogador_1.Jogador({
                nome: player.name,
                senha: senhaHash,
                nivel: 1,
                email: data.email,
                celular: util_1.soNumeros(data.celular),
            });
            return jogador.save();
        });
    }
    criarVeiculo(player, dataVehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug(`[CREATE VEHICLE] New vehicle created by ${player.name}`);
            if (!vehicles_1.Veiculos[dataVehicle.modelo]) {
                throw 'Model not found';
            }
            const rgbPrimaria = util_1.hexToRgb(dataVehicle.corPrimaria);
            const rgbSecundaria = util_1.hexToRgb(dataVehicle.corSecundaria);
            const jogador = yield this.loadPlayer(player.name);
            if (!jogador) {
                throw 'Player not found';
            }
            const veiculo = new Veiculo_1.Veiculo({
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
            yield veiculo.save();
            const veiculoMp = mp.vehicles.new(vehicles_1.Veiculos[dataVehicle.modelo], new mp.Vector3(parseFloat(dataVehicle.posicaoX), parseFloat(dataVehicle.posicaoY), parseFloat(dataVehicle.posicaoZ)));
            veiculoMp.engine = dataVehicle.motor;
            veiculoMp.locked = dataVehicle.trancado;
            veiculoMp.setColorRGB(rgbPrimaria.r, rgbPrimaria.g, rgbPrimaria.b, rgbSecundaria.r, rgbSecundaria.g, rgbSecundaria.b);
            veiculoMp.numberPlate = dataVehicle.placa;
            veiculoMp.alpha = dataVehicle.transparencia;
            veiculoMp.spawn(veiculoMp.position, 0);
            return true;
        });
    }
}
exports.BrazucasServer = BrazucasServer;
//# sourceMappingURL=brazucas-server.js.map