import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const foundItemSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required.'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required.'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required.'
  }),
  dateFound: Joi.string().isoDate().required().messages({
    'string.empty': 'Date found is required.',
    'string.isoDate': 'Date must be in ISO format (YYYY-MM-DD).'
  }),
  foundBy: Joi.string().required().messages({
    'string.empty': 'Reporter name (foundBy) is required.'
  })
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
