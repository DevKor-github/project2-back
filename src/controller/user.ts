import { NextFunction, Request, Response } from 'express';
import * as userService from '../service/userService';

export const register = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.user) throw Error('already login');
    const { username, password } = req.body;
    await userService.register(username, password);
    res.sendStatus(201);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.user) throw Error('already login');
    const { username, password } = req.body;
    const id = await userService.validateUser(username, password);

    const accessToken = id.toString() + 'access';

    res.json({ accessToken: accessToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
