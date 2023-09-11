import { NextFunction, Request, Response } from 'express';

export const authChecker = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (token) {
    const userId = token.substring(0, 1);

    req.user = userId;
  }
  next();
};
