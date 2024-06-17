import { ValidationSchema } from '@core/interfaces/validationSchema';
import Joi from 'joi';

const ticketTypeValidation: ValidationSchema = {
  body: Joi.object().keys({
    title: Joi.string().required().max(50),
    description: Joi.string().required(),
  }),
};

export default ticketTypeValidation;
