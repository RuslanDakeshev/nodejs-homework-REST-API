const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).required(),
});

module.exports = {
  schema,
};