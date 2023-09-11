import * as categoryService from '../service/categoryService';
import { Request, Response } from 'express';
export const getCategory = async (req: Request, res: Response, next) => {
  try {
    const categoryList = await categoryService.getCategory(req);
    res.status(200).json(categoryList);
  } catch (err) {
    next(err);
  }
};
export const pickCategory = async (req:Request, res:Response, next) => {
  try {
    const categoryList = await categoryService.pickCategory();
    res.status(200).json(categoryList);
  } catch (err) {
    next(err);
  }
};
export const deleteCategory = async (req:Request, res:Response, next) => {
  try {
    const categoryList = await categoryService.deleteCategory(req);
    res.status(200).json(categoryList);
  } catch (err) {
    next(err);
  }
};
export const createCategory = async (req:Request, res:Response, next) => {
  try {
    const postList = await categoryService.createCategory(req);
    res.status(200).json(postList);
  } catch (err) {
    next(err);
  }
};
export const updateCategory = async (req:Request, res:Response, next) => {
  try {
    const postList = await categoryService.updateCategory(req);
    res.status(200).json(postList);
  } catch (err) {
    next(err);
  }
};
