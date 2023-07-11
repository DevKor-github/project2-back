import {EntitySchema} from 'typeorm';

//개인 정보 entity
const postSchema = new EntitySchema({
	name: 'post', //code상에서 접근하기 위한 이름.
	tableName: 'post', //DB에 만들어질 table의 이름.
	columns: { //DB가 어떤 정보를 가지는지 종류를 세로선에 저장. 
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
			type: 'varchar',//type에는 어떤 변수형인지 명시를 할 수 있다. 
			length: 255,
			nullable: true,
		},
	},
});

export default postSchema;

//쪽지 entity
const memoSchema = new EntitySchema({
	name: '', 
	tableName: '',
	columns: { 
		content: {
			type: 'int',
			primary: true,
			generated: true,
		},
		date: {
			type: 'int',
			length: 50,
		},
		category: {
			type: 'varchar',//category의 함수를 만들어 가져오자. 
			length: 255,
			nullable: true,
		},
	},
});
//이미 뽑은 쪽지라면 err을 띄우기?


//카테고리 entity
