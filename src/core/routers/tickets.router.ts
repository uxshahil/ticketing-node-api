import { TicketController } from '@core/controllers/ticket.controller';
import validation from '@core/middlewares/validate.middleware';
import { ticketValidation } from '@core/validators/ticket.validation';
import { Router } from 'express';

const router: Router = Router();
const ticketController = new TicketController();

/**
 * @openapi
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: Creates a new ticket in the system.
 *     tags:
 *       - tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - number
 *               -
 *               - ticketTypeId
 *             properties:
 *               description:
 *                 type: string
 *                 description: Detailed description of the ticket.
 *                 example: Something is broken
 *               number:
 *                 type: integer
 *                 description: Unique identifier for the ticket.
 *                 example: 123
 *               :
 *                 type: string
 *                 description: UUID of the user who created the ticket.
 *                 example: 123e4567-e89b-12d3-a456-4266-9c88-29676616ae26e
 *               ticketTypeId:
 *                 type: string
 *                 description: UUID of the ticket type.
 *                 example: abcdef12-3456-abcd-7890-efgh-ijklmnopqrstuvwxy
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post(
  '/tickets',
  [validation(ticketValidation)],
  ticketController.createTicket,
);

/**
 * @openapi
 * /api/tickets:
 *   get:
 *     summary: Retrieve all tickets
 *     description: Returns a list of tickets.
 *     tags:
 *       - tickets
 *     responses:
 *       200:
 *         description: A list of ticket objects.
 *       500:
 *         description: Server error
 */
router.get('/tickets', ticketController.findTickets);

/**
 * @openapi
 * /api/tickets/{id}:
 *   get:
 *     summary: Find a ticket by ID
 *     description: Returns a single ticket by ID.
 *     tags:
 *       - tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the ticket to retrieve.
 *     responses:
 *       200:
 *         description: A single ticket object.
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.get('/tickets/:id', ticketController.findTicketById);

/**
 * @openapi
 * /api/tickets/{id}:
 *   put:
 *     summary: Update a ticket by ID
 *     description: Updates a ticket in the system.
 *     tags:
 *       - tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the ticket to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Detailed description of the ticket.
 *                 example: Something is broken
 *               number:
 *                 type: integer
 *                 description: Unique identifier for the ticket.
 *                 example: 123
 *               :
 *                 type: string
 *                 description: UUID of the user who created the ticket.
 *                 example: 123e4567-e89b-12d3-a456-4266-9c88-29676616ae26e
 *               ticketTypeId:
 *                 type: string
 *                 description: UUID of the ticket type.
 *                 example: abcdef12-3456-abcd-7890-efgh-ijklmnopqrstuvwxy
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.put(
  '/tickets/:id',
  [validation(ticketValidation)],
  ticketController.updateTicket,
);

/**
 * @openapi
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     description: Deletes a single ticket by ID.
 *     tags:
 *       - tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the ticket to delete.
 *     responses:
 *       204:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.delete('/tickets/:id', ticketController.deleteTicket);

export default router;
