import {Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {ObjectId} from "mongodb"

@Entity("users")
export class User {
  @ObjectIdColumn()
  _id : ObjectId

  @Column()
  laoName: string;

  @Column()
  laoLastname?: string;

  @Column()
  engName: string;

  @Column()
  engLastname?: string;

  @Column()
  gender: string;

  @Column()
  birth?: Date;

  @Column()
  tel: string;

  @Column()
  email?: string;

  @Column()
  password: string;

  @Column()
  bornProvince?: string;

  @Column()
  bornDistrict?: string;

  @Column()
  bornVillage?: string;

  @Column()
  presentProvince?: string;

  @Column()
  presentDistrict?: string;

  @Column()
  presentVillage?: string;

  @Column()
  documentType?: string

  @Column()
  documentId?: string;

  @Column()
  issueDate?: string;

  @Column()
  expiryDate?: string;

  @Column()
  documentImage?: string[];

  @Column()
  brandType?: string;

  @Column()
  brandName?: string;

  @Column()
  registrationNumber?: string;

  @Column()
  registrationDate?: Date;

  @Column()
  registrationImage?: string

  @Column()
  logo?: string;

  @Column()
  signature?: string;

  @Column({default: "SHOP_OWNER"})
  role: string;

  @Column()
  isActive?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}