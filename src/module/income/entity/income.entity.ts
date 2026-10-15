import { Entity, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("incomes")
export class Income {
         @ObjectIdColumn()
         _id : ObjectId;

         @Column({default: 500000})
         amount: number;

         @Column()
         payBy: any;

         @CreateDateColumn()
         createdAt?: Date;
}