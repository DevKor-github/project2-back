import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isPicked: boolean;

  @Column()
  content: string;
}
