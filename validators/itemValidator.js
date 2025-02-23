import Joi from 'joi';

export const itemSchema = Joi.object({
  title: Joi.string().min(3).required()
});

export const statusSchema = Joi.object({
  status: Joi.string().valid('new', 'done').required()
});
