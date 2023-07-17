import * as postService from '../service/postService.js';

export const getPostList = async (req, res, next) => {
	try {
		const postList = await postService.getPostList();//postcontroller에서 모든 post를 가져온다.  
		res.status(200).json(postList); //http list를 json으로 보내ㅐ준다. 
	} catch (err) {
		next(err);
	}
};
//try안에 있는 코드에서 만약 error(err)이 발생한다면, catch 뒤에 있는 걸 실행한다. 
//index.js에서 next err을 실행한다면,  middlewares > errorhandler.js를 실행한다.

export const insertpost = async (req, res, next) => {
	try {
		const {name} = req.body; //req.body로 name을 전달받는다. 
		await postService.insertpost(name); //name을 insertpost로 전달해준다. service > postservice.js 
		res.status(200).json({
			data:null,
			message : 'post created!',
		});
	} catch (err) {
		next(err);
	}
}; 