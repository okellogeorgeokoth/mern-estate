import express from 'express';
import { test } from '../controllers/user.controller.js'; // Adjust the path if necessary

const router = express.Router();

// Use the controller function for the /test route
router.get('/test', test);

export default router;
