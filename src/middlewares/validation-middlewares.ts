import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export function validateSchema(schema: Schema, type: 'body' | 'params' ) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req[type], { abortEarly: false });
    if(validation.error) {
      return res.status(httpStatus.BAD_REQUEST).send(validation.error.details.map((detail) => detail.message));
    }
    next();
  };
}
