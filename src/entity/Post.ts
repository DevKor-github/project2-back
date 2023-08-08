import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  author: string;
  @Column()
  write: string;
  @Column()
  when: Date;
  @Column()
  isPicked: boolean;
  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;
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
