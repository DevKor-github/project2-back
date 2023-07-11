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
        color:{
            type:'text'
        }
		
},});

export default postSchema;