import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { CatalogTimestamp } from "./urlTimestamp";

@Entity()
export class UrlObject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shorturl: string;

    @Column()
    fullurl: string;

}