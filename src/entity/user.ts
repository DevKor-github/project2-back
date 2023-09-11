import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  @Column()
  password: string;
}

/*const postSchema = new EntitySchema({
	name: 'post',
	tableName: 'post',
	columns: {
		id: {
			type: 'int',
			primary: true,
			generated: true,
		},
		name: {
			type: 'varchar',
			length: 255,
		},
		author: {
			type: 'varchar',
			length: 255,
			nullable: true,
		},
		write:{
			type:'varchar',
			length: 255,
		},//db 저장 데이터추가
		when:{
			type:'date',
			},
		isPicked:{
			type:'boolean',
		}
		
	},
});

export default postSchema;
*/
