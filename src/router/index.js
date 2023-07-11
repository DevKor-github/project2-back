import express from 'express';

import postRouter from './post.js';

const router = express.Router();

router.use('/post', postRouter); //post 다음으로 오는 요청들은, postRouter가 처리한다. 

router.get('/', (req, res) => {
	res.send('Hello World!');
});
// 그냥 '/'(slash)다음으로 오는 요청들은 'Hello World!'를 출력한다. 
export default router;


//router란? 어떤 경로로 요청이 오면 어떤 함수를 실행하는지를 알려준다. 
//이 때, 경로는 http:~~ 이후의 '/'(slash)다음의 것들이다.  