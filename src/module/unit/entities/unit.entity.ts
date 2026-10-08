import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("units")
export class Unit {
    @ObjectIdColumn()
    _id : ObjectId;

    @Column()
    name: string;

    @Column()
    owner: ObjectId;
}