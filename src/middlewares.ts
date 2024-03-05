import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ErrorResponse from './interfaces/ErrorResponse';
import UserModel from './models/userModel';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.body.user = await UserModel.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized , token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized Token');
  }
});

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user && req.body.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized , token failed');
  }
};

export { protect, admin };