import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { BankAccount } from './BankAccount';
import { BankTypeTransaction } from './BankTypeTransaction';

@Table({
  timestamps: true,
  createdAt: 'dateCreated',
  deletedAt: 'dataDeleted',
  updatedAt: 'dateUpdated',
  paranoid: true,
})
export class BankTransaction extends Model<BankTransaction> {

  @Column
  value: number;

  @BelongsTo(() => BankAccount, {foreignKey: {allowNull: false, name: 'conta'}})
  bancoTransacaoConta: BankAccount;

  @BelongsTo(() => BankTypeTransaction, {foreignKey: {allowNull: false, name: 'tipo'}})
  bancoTransacaoTipo: BankTypeTransaction;
}
