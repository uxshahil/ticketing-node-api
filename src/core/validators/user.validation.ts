import { ValidationSchema } from '@core/interfaces/validationSchema';
import Joi from 'joi';

const userValidation: ValidationSchema = {
  body: Joi.object().keys({
    firstName: Joi.string().required().max(50),
    lastName: Joi.string().max(50),
    profilePic: Joi.string().max(500),
    email: Joi.string().required().max(100),
    password: Joi.string().required().max(25),
  }),
};

export default userValidation;
