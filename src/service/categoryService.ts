import { Category } from '../entity/category';
import dataSource from '../config/dataSource';


const categoryRepository = dataSource.getRepository(Category);
export const getCategory = async (req) => {
  try {
    const category = await categoryRepository.find({});
    return category;
  } catch (err) {
    console.error(err);
  }
};
export const pickCategory = async () => {
  try {
    const category = await categoryRepository.findOne({});
    //await categoryRepository.save(category);
    return category;
  } catch (err) {
    console.error(err);
  }
};
export const deleteCategory = async (req) => {
  try {
    const category = await categoryRepository.findOne({ where: { id: req.params.id } });
    await categoryRepository.delete(category);
   // await categoryRepository.save(category);
    return category;
  } catch (err) {
    console.error(err);
  }
};
export const createCategory = async (req) => {
  try {
    const category = await categoryRepository.create({
      color: req.body.color
    });
    await categoryRepository.save(category);
    return category;
  } catch (err) {
    console.error(err);
  }
};
export const updateCategory = async (req) => {
  try {
    const category = await categoryRepository.update(
      { id: req.params.id },
      {
        color: req.body.color
      }
    );
    return category;
  } catch (err) {
    console.error(err);
  }
};

const getPostListByCategory =async (id:number) => {
    const category = await categoryRepository.findOne({
        where:{id:id}, relations:['post']
    })
    return category.posts
}