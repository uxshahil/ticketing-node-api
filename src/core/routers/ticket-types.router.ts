import { TicketTypeController } from '@core/controllers/ticket-type.controller';
import validation from '@core/middlewares/validate.middleware';
import ticketTypeValidation from '@core/validators/ticket-type.validation';
import { Router } from 'express';

const router: Router = Router();
const ticketTypeController = new TicketTypeController();

/**
 * @openapi
 * /api/ticket-types:
 *   post:
 *     summary: Create a new ticket type
 *     description: Creates a new ticket type in the system.
 *     tags:
 *       - ticket-types
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the ticket type.
 *                 example: Bug Report
 *               description:
 *                 type: string
 *                 description: Description of the ticket type.
 *                 example: A bug report ticket for software issues.
 *     responses:
 *       201:
 *         description: Ticket type created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post(
  '/ticket-types',
  [validation(ticketTypeValidation)], // Assuming you have a validation schema for creating ticket types
  ticketTypeController.createTicketType,
);

/**
 * @openapi
 * /api/ticket-types:
 *   get:
 *     summary: Retrieve all ticket types
 *     description: Returns a list of ticket types.
 *     tags:
 *       - ticket-types
 *     responses:
 *       200:
 *         description: A list of ticket type objects.
 *       500:
 *         description: Server error
 */
router.get('/ticket-types', ticketTypeController.findTicketTypes);

/**
 * @openapi
 * /api/ticket-types/{id}:
 *   get:
 *     summary: Find a ticket type by ID
 *     description: Returns a single ticket type by ID.
 *     tags:
 *       - ticket-types
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the ticket type to retrieve.
 *     responses:
 *       200:
 *         description: A single ticket type object.
 *       404:
 *         description: Ticket type not found
 *       500:
 *         description: Server error
 */
router.get('/ticket-types/:id', ticketTypeController.findTicketTypeById);

/**
 * @openapi
 * /api/ticket-types/{id}:
 *   put:
 *     summary: Update a ticket type by ID
 *     description: Updates a ticket type in the system.
 *     tags:
 *       - ticket-types
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the ticket type to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the ticket type.
 *                 example: Feature Request
 *               description:
 *                 type: string
 *                 description: Updated description of the ticket type.
 *                 example: A request for new features.
 *     responses:
 *       200:
 *         description: Ticket type updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Ticket type not found
 *       500:
 *         description: Server error
 */
router.put(
  '/ticket-types/:id',
  [validation(ticketTypeValidation)], // Assuming you have a validation schema for updating ticket types
  ticketTypeController.updateTicketType,
);

/**
 * @openapi
 * /api/ticket-types/{id}:
 *   delete:
 *     summary: Delete a ticket type by ID
 *     description: Deletes a single ticket type by ID.
 *     tags:
 *       - ticket-types
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the ticket type to delete.
 *     responses:
 *       204:
 *         description: Ticket type deleted successfully
 *       404:
 *         description: Ticket type not found
 *       500:
 *         description: Server error
 */
router.delete('/ticket-types/:id', ticketTypeController.deleteTicketType);

export default router;
