import express from 'express';
import { router as userRoute } from '../modules/users/user.route.js';
import { router as transferRoute } from '../modules/tranfers/transfer.route.js';
export const router = express.Router();

router.use('/users', userRoute);
router.use('/transfers', transferRoute);
