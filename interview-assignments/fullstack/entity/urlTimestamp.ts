import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { UrlObject } from "./urlObject";

@Entity()
export class CatalogTimestamp {

    @PrimaryGeneratedColumn()
    id: number;
}