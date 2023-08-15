import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
  @Column()
  name: string;
}
