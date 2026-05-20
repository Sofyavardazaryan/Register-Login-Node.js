const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = userSchema;