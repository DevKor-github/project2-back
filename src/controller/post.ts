import * as postService from '../service/postService';
import { Request, Response } from 'express';
export const getPostList = async (req: any, res: Response, next) => {
  try {
    if (!req.user) {
      throw Error('unathorizted');
    }//로그인 한 유저인지 확인작업
    console.log(req.user);
    const postList = await postService.getPostList(req, req.body.categoryName);
    res.status(200).json(postList);
  } catch (err) {
    next(err);
  }
};
export const pickPost = async (req: Request, res: Response, next) => {
  try {
    const postList = await postService.pickPost();
    res.status(200).json(postList);
  } catch (err) {
    next(err);
  }
};
export const deletePost = async (req: Request, res: Response, next) => {
  try {
    const postList = await postService.deletePost(req);
    res.status(200).json(postList);
  } catch (err) {
    next(err);
  }
};
export const createPost = async (req: Request, res: Response, next) => {
  try {
    const postList = await postService.createPost(req, req.body.categoryName);
    res.status(200).json(postList);
  } catch (err) {
    next(err);
  }
};
export const updatePost = async (req: Request, res: Response, next) => {
  try {
    const postList = await postService.updatePost(req);
    res.status(200).json(postList);
  } catch (err) {
    next(err);
  }
};
