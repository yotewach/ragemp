import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Notification } from './Notification';
import { Profession } from './Profession';

@Table({
  timestamps: true,
  createdAt: 'dateCreated',
  deletedAt: 'dataDeleted',
  updatedAt: 'dateUpdated',
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['name'],
    }
  ]
})
export class Player extends Model<Player> {

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  password: string;

  @Column({allowNull: false})
  email: string;

  @Column({allowNull: false})
  phone: string;

  @Column({defaultValue: 1})
  level: number;

  @Column({defaultValue: 0})
  money: number;

  @Column({defaultValue: 0})
  credits: number;

  @Column({defaultValue: 100})
  hunger: number;

  @Column({defaultValue: 100})
  sleep: number;

  @Column({defaultValue: 100})
  physicalStrength: number;

  @Column({defaultValue: 100})
  thirst: number;

  @BelongsTo(() => Profession, {foreignKey: {allowNull: true, name: 'profession'}})
  playerProfessional: Profession;

  @HasMany(() => Notification)
  notifications: Notification[];
}
