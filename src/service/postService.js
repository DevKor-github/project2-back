import dataSource from '../config/dataSource.js';

const postRepository = dataSource.getRepository('post');

const insertPost = async (name) => {};

export const getPostList = async () => {
	try {
		const postList = await postRepository.find();
		return postList;
	} catch (err) {
		console.error(err);
	}
};