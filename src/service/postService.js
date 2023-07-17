import dataSource from '../config/dataSource.js';

const postRepository = dataSource.getRepository('post');
//post.js에서 다룬 post관련 DB를 가져온다. 
postRepository.find();
postRepository.create();
postRepository.delete();

const insertPost = async (name) => {
	const post = postRepository.create({
	name,
	})
};
//controller > post.js에서 insertpost에 들어가는 name값을 받아온다. 

export const getPostList = async () => {
	try {
		const postList = await postRepository.find({where:{id:1}});
		//controller > post.js의 posttable에 있는 모든 data를 가져와서 다룬다. 
		//find 함수로 DB를 조회할 수 있다. 
		return postList;
	} catch (err) {
		console.error(err);
	}
};