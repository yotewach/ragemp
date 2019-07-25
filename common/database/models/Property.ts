import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { PropertyType } from './PropertyType';

@Table({
  timestamps: true,
  createdAt: 'dateCreated',
  deletedAt: 'dataDeleted',
  updatedAt: 'dateUpdated',
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['originalName', 'displayedName'],
    }
  ]
})
export class Property extends Model<Property> {

  @Column({allowNull: false})
  originalName: string;

  @Column({allowNull: false})
  displayedName: string;

  @Column({allowNull: false})
  doorEnterX: number;

  @Column({allowNull: false})
  doorEnterY: number;

  @Column({allowNull: false})
  doorEnterZ: number;

  @Column({allowNull: false})
  exitDoorX: number;

  @Column({allowNull: false})
  exitDoorY: number;

  @Column({allowNull: false})
  exitDoorZ: number;

  @Column({allowNull: false})
  pickupIcon: string;

  @BelongsTo(() => PropertyType, {foreignKey: {allowNull: false, name: 'type'}})
  propertyType: PropertyType;
}
