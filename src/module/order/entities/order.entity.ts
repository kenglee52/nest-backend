import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

export class OrderItem {
  @Column()
  productId: ObjectId; 

  @Column()
  barcode: string;

  @Column()
  name: string;

  @Column()
  price: number;           

  @Column()
  qty: number;             

  @Column()
  color?: string;          

  @Column()
  size?: string;            

  @Column()
  image?: string;           
}

@Entity("orders")
export class Order {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  date: Date;

  @Column()
  logisticType?: string;

  @Column()
  logisticName?: string;

  @Column()
  sellerId?: ObjectId;

  @Column()
  customerId?: ObjectId;

  @Column(() => OrderItem)
  items: OrderItem[];

  @Column()
  total: number;
}