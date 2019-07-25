import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { BankTransaction } from './BankTransaction';

@Table({
  timestamps: true,
  createdAt: 'dateCreated',
  deletedAt: 'dataDeleted',
  updatedAt: 'dateUpdated',
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['identifier'],
    }
  ]
})
export class BankTypeTransaction extends Model<BankTypeTransaction> {

  @PrimaryKey
  @Column
  id: number;

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  identifier: string;

  @HasMany(() => BankTransaction, 'type')
  transactions: BankTransaction[];
}
