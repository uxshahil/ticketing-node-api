import { ValidationSchema } from '@core/interfaces/validationSchema';
import Joi from 'joi';

const userValidation: ValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().max(100),
    password: Joi.string().required().max(25),
    jwt: Joi.string(),
  }),
};

export default userValidation;
