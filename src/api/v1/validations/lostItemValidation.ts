import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  dateReported: Joi.string().isoDate().required(),
});

export const validateLostItem = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};
