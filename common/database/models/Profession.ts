import { Column, HasMany, Model, Table } from 'sequelize-typescript';
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
      fields: ['name'],
    }
  ]
})
export class Profession extends Model<Profession> {

  @Column({allowNull: false})
  nome: string;

  @Column({allowNull: false, defaultValue: 10})
  vagas: number;

  @Column({allowNull: false, defaultValue: 1})
  nivelMinimo: number;

  @Column({allowNull: false})
  salario: number;

  @HasMany(() => Player, 'profession')
  players: Player[];
}
