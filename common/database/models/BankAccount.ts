import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Player } from './Player';
import { Property } from './Property';

@Table({
  timestamps: true,
  createdAt: 'dateCreated',
  deletedAt: 'dataDeleted',
  updatedAt: 'dateUpdated',
  paranoid: true,
})
export class BankAccount extends Model<BankAccount> {

  @Column({allowNull: false})
  number: string;

  @BelongsTo(() => Property, {foreignKey: {allowNull: false, name: 'property'}})
  bankAccountProperty: Property;

  @BelongsTo(() => Player, {foreignKey: {allowNull: false, name: 'player'}})
  bankAccountPlayer: Player;
}
