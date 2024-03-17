import Joi from 'joi';

const emotionCreate = Joi.object({
  emotion: Joi.string().min(2).max(30).required(),
  emoji: Joi.string().pattern(/[\p{Emoji_Presentation}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}\u{1F9B8}-\u{1F9B9}]/u).min(1).max(3).required(),
  // color hexadecimal
  color: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).required(),
  description: Joi.string().min(3).max(250).required(),
  // idUser: Joi.string(),
});

const emotionCreateAi = Joi.object({
  description: Joi.string().min(3).max(250).required(),
});

const emotionFindEmotionId = Joi.object({
  id: Joi.string().required(),
});

const emotionUpdate = Joi.object({
  emotion: Joi.string().min(2).max(30).required(),
  emoji: Joi.string().pattern(/[\p{Emoji_Presentation}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}\u{1F9B8}-\u{1F9B9}]/u).min(1).max(3).required(),
  // color hexadecimal
  color: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).required(),
  description: Joi.string().min(3).max(250).required(),
});

export { emotionCreate, emotionCreateAi, emotionFindEmotionId, emotionUpdate };