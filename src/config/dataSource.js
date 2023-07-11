import typeorm from 'typeorm';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

dotenv.config();

const fileURL = import.meta.url;
const filePath = fileURLToPath(fileURL);
const dirPath = dirname(filePath);

const dataSource = new typeorm.DataSource({
	type: 'postgres', //어떤 DB를 사용하는지 설정. 
	host: process.env.DB_HOST || 'localhost',
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || 'postgres',
	database: process.env.DB_NAME || 'naromaro',
	//DB계정 정보.
	//process.env : 중요한 개인 정보
	synchronize: true,
	entities: [dirPath + '/../entity/Post.js', dirPath + '/../entity/User.js'],
});
//entities는 entity폴더 안의 파일을 이용한다. 
//DB에 있는 table 하나랑, 프로그램 상에 돌아가는 코드 하나를 연결한다. 

export default dataSource;
