import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Length,
    Model,
    PrimaryKey,
    Table,
    Unique,
  } from "sequelize-typescript";
import { User } from "./User";
    
  @Table({
    timestamps: true,
  })
  export class Page extends Model<Page> {

    @PrimaryKey
    @Column(DataType.STRING)
    public id: String;
    
    @ForeignKey(() => User)
    @Column(DataType.STRING)
    public UserId: string;

    @AllowNull(true)
    @Column(DataType.BOOLEAN) public active: boolean;
  
    @AllowNull(true)
    @Unique
    @Column(DataType.STRING) public creationDate: string;
  
    @AllowNull(true)
    @Column(DataType.STRING) public name: string;

    @BelongsTo(() => User)
    public user: User;

  }
  