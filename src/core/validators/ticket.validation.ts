import { ValidationSchema } from '@core/interfaces/validationSchema';
import Joi from 'joi';

const ticketValidation: ValidationSchema = {
  body: Joi.object().keys({
    description: Joi.string(),
    createdBy: Joi.string().uuid().required(),
    ticketTypeId: Joi.string().uuid().required(),
    assignedTo: Joi.string().uuid(),
    dueDate: Joi.date().iso(),
    completedDate: Joi.date().iso(),
    status: Joi.string()
      .valid('unassigned', 'open', 'paused', 'closed')
      .required(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
  }),
};

export default ticketValidation;

const ticketTypeValidation: ValidationSchema = {
  body: Joi.object({
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().max(50).optional(),
  }),
};

export { ticketTypeValidation, ticketValidation };
