import { Category } from '../entity/category';
import dataSource from '../config/dataSource';
import { Post } from '../entity/Post';

const postRepository = dataSource.getRepository(Post);
const categoryRepository = dataSource.getRepository(Category);
//조회
export const getPostList = async (req, categoryName: string) => {
  try {
    const postList = await postRepository.find({});
    return postList;
  } catch (err) {
    console.error(err);
  }
};
//뽑기
export const pickPost = async () => {
  try {
    const post = await postRepository.findOne({});
    post.isPicked = true;
    await postRepository.save(post);
    return post;
  } catch (err) {
    console.error(err);
  }
};
//지워오는거
export const deletePost = async (req) => {
  try {
    const post = await postRepository.findOne({ where: { id: req.params.id } });
    await postRepository.delete(post);
  } catch (err) {
    console.error(err);
  }
};
export const createPost = async (req, categoryName: string) => {
  try {
    const category = await categoryRepository.findOne({
      where: { color: categoryName },
    }); //왜 찾는함수를 썼는지??

    const Post = await postRepository.create({
      name: req.body.name,
      author: req.body.author,
      write: req.body.write,
      when: req.body.when,
      isPicked: false,
      category: category,
    });
    await postRepository.save(Post);
    return Post;
  } catch (err) {
    console.error(err);
  }
};
export const updatePost = async (req) => {
  try {
    const post = await postRepository.update(
      { id: req.params.id },
      {
        name: req.body.name,
        write: req.body.write,
        author: req.body.author,
        when: req.body.when,
      }
    );
    return post;
  } catch (err) {
    console.error(err);
  }
};
