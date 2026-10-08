import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
export class ProductColorImage {
  @Column()
  color?: string;

  @Column()
  images: string[]; 
}

@Entity("products")
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  barcode: string;

  @Column()
  name: string;

  @Column()
  category: ObjectId;

  @Column()
  unit: ObjectId;

  @Column()
  importPrice: number;

  @Column()
  price: number;

  @Column()
  proPrice?: number;

  @Column()
  quantity: number;

  @Column()
  limit?: number;

  @Column(() => ProductColorImage)
  colorImages?: ProductColorImage[];

  @Column()
  size?: string[];

  @Column()
  issue?: Date;

  @Column()
  expiry?: Date;

  @Column()
  description?: string;

  @Column()
  owner: ObjectId;
}