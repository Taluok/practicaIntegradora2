import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";

const router = Router();
const ticketController = new TicketController();

// Rutas relacionadas con los tickets
router.get('/', ticketController.getAll);
router.get('/:id', ticketController.getById);
router.post('/', ticketController.create);

export default router;
