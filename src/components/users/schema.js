import Joi from 'joi';

const userCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userFindUserId = Joi.object({
  id: Joi.string().required(),
});

const userUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

export { userCreate, userFindUserId, userUpdate };
