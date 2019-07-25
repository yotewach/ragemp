import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Player } from './Player';

@Table({
  timestamps: true,
  createdAt: 'dateCreated',
  deletedAt: 'dataDeleted',
  updatedAt: 'dateUpdated',
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['originalBoard', 'boardDisplayed'],
    }
  ]
})
export class Vehicle extends Model<Vehicle> {

  @Column({allowNull: false})
  originalBoard: string;

  @Column({allowNull: false})
  boardDisplayed: string;

  @Column({allowNull: false})
  model: string;

  @Column({allowNull: false, type: DataType.STRING})
  positionX: string;

  @Column({allowNull: false, type: DataType.STRING})
  positionY: string;

  @Column({allowNull: false, type: DataType.STRING})
  positionZ: string;

  @Column({allowNull: false, type: DataType.STRING})
  originalPositionX: string;

  @Column({allowNull: false, type: DataType.STRING})
  originalPositionY: string;

  @Column({allowNull: false, type: DataType.STRING})
  originalPositionZ: string;

  @Column({allowNull: false})
  rotation: number;

  @Column({allowNull: false})
  transparency: number;

  @Column({allowNull: false})
  colorPrimaryR: number;

  @Column({allowNull: false})
  colorPrimaryG: number;

  @Column({allowNull: false})
  colorPrimaryB: number;

  @Column({allowNull: false})
  colorSecondaryR: number;

  @Column({allowNull: false})
  colorSecondaryG: number;

  @Column({allowNull: false})
  colorSecondaryB: number;

  @Column({allowNull: false, defaultValue: true})
  locked: boolean;

  @Column({allowNull: false, defaultValue: false})
  motor: boolean;

  @Column({allowNull: false, defaultValue: 1})
  world: number;

  @Column({allowNull: false})
  originalValue: number;

  @Column({allowNull: false})
  saleValue: number;

  @Column({allowNull: false, defaultValue: true})
  forSale: boolean;

  @BelongsTo(() => Player, {foreignKey: {allowNull: true, name: 'player'}})
  playerVehicle: Player;
}
