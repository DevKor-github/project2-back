import dataSource from '../config/dataSource.js';

const postRepository = dataSource.getRepository('post');

const insertPost = async (name) => {};
//조회
export const getPostList = async () => {
	try {
		const postList = await postRepository.find();
		return postList;
	} catch (err) {
		console.error(err);
	}
};
//뽑기
export const pickPost = async () => {
	try {
		const post = await postRepository.findOne({where: {isPicked: false}});
		post.isPicked = true;
		await postRepository.save(post);
		return post;
	} catch (err) {
		console.error(err);
	}
};
//특정 글귀 조회
export const  readSpecificPost =async ()=>{
	try{
		var letter=prompt("찾고자 하는 글귀를 입력하세요");
		const post= await postRepository.findOne({where:{$like:'%${prompt}%'}})
		return post;
	}catch(err){
		console.error(err);
	}
}
//지워오는거
export const deletePost = async () => {
	try {
		var letter=prompt("찾고자 하는 글귀를 입력하세요");
		const post = await postRepository.findOne({where: {$like:'%${prompt}%'}});

		await postRepository.remove(post);
		
	} catch (err) {
		console.error(err);
	}
};
//만들기(이렇게 해도 되나>?)
export const saveNewPost = async () => {
	try {
		var letter=prompt("넣고자 하는 글귀를 입력하세요");
	  const newPost = await postRepository.create({ letter });
	  await postRepository.save(newPost);
	  return newPost;
	} catch (err) {
	  console.error(err);
	}
  };
  