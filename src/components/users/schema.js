import Joi from 'joi';

const userCreate = Joi.object({
  username: Joi.string().min(3).max(250).required(),
  password: Joi.string().min(6).max(250).required(),
});

const userFindUserId = Joi.object({
  id: Joi.string().required(),
});

const userUpdate = Joi.object({
  username: Joi.string().min(3).max(250).required(),
  password: Joi.string().min(6).max(250).required(),
});

export { userCreate, userFindUserId, userUpdate };
