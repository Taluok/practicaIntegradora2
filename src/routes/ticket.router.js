import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";

const controller = new TicketController();
const router = Router();

router.post('/create', async (req, res, next) => {
    try {
        const result = await controller.createTicket(req.body); // Asumiendo que createTicket recibe los datos del ticket en req.body
        res.json(result); // Devuelve el resultado como JSON
    } catch (error) {
        next(error); // Pasa el error al middleware de manejo de errores
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const result = await controller.updateTicket(req.body); // Asumiendo que updateTicket recibe los datos del ticket a actualizar en req.body
        res.json(result); // Devuelve el resultado como JSON
    } catch (error) {
        next(error); // Pasa el error al middleware de manejo de errores
    }
});

export default router;

