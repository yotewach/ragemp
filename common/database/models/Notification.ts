import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Player } from './Player';

@Table({
  timestamps: true,
  createdAt: 'dateCreated',
  deletedAt: 'dataDeleted',
  updatedAt: 'dateUpdated',
  paranoid: true,
})
export class Notification extends Model<Notification> {

  @Column({allowNull: false})
  title: string;

  @Column({allowNull: false})
  description: string;

  @Column({defaultValue: false})
  read: boolean;

  @Column
  dataRead: string;

  @ForeignKey(() => Player)
  player: Player;
}
