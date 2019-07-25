import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Property } from './Property';

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
export class PropertyType extends Model<PropertyType> {

  @PrimaryKey
  @Column
  id: number;

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  identifier: string;

  @HasMany(() => Property, 'type')
  properties: Property[];
}
