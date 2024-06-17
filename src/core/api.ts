import { Router } from 'express';

import healthCheck from '@components/healthcheck/healthCheck.router';
import auth from '@core/routers/auth.router';
import ticketType from '@core/routers/ticket-type.router';
import ticket from '@core/routers/ticket.router';
import user from '@core/routers/user.router';

const router: Router = Router();
router.use(healthCheck);
router.use(user);
router.use(auth);
router.use(ticket);
router.use(ticketType);

export default router;
