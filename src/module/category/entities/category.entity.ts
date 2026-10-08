import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("categories")
export class Category {
    @ObjectIdColumn()
    _id : ObjectId;

    @Column()
    name: string;

    @Column()
    owner: ObjectId;
}