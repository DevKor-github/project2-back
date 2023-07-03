import {EntitySchema} from 'typeorm';

const postSchema = new EntitySchema({
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
	},
});

export default postSchema;
