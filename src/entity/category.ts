import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Post } from './Post';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	color: string;

	@OneToMany(()=> Post, (post) => post.category)
	posts: Post[];
}
/*
const postSchema = new EntitySchema({
	name: 'post',
	tableName: 'post',
	columns: {
		id: {
			type: 'int',
			primary: true,
			generated: true,
		},
        color:{
            type:'text'
        }
		
},});

export default postSchema;
*/