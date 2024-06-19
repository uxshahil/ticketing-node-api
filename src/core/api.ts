import { Router } from 'express';

import healthCheck from '@components/healthcheck/healthCheck.router';
import auth from '@core/routers/auth.router';
import ticketTypes from '@core/routers/ticket-types.router';
import tickets from '@core/routers/tickets.router';
import users from '@core/routers/users.router';

const router: Router = Router();
router.use(healthCheck);
router.use(users);
router.use(auth);
router.use(tickets);
router.use(ticketTypes);

export default router;
