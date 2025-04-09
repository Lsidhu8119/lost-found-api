import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const foundItemSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  dateFound: Joi.string().isoDate().required(),
  foundBy: Joi.string().required()
});

export const validateFoundItem = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = foundItemSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};
