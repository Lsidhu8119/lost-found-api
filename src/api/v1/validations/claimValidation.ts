import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const claimSchema = Joi.object({
  itemId: Joi.string().required(),
  claimantName: Joi.string().required(),
  claimantEmail: Joi.string().email().required(),
  justification: Joi.string().min(10).required(),
  dateClaimed: Joi.string().isoDate().required(),
});

export const validateClaim = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = claimSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};
