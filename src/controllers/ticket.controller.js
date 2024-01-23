import TicketService from "../services/ticket.service.js";
import { createResponse } from "../utils.js";
import TicketDTO from "../dto/ticket.DTO.js";

const ticketService = new TicketService();

export default class TicketController {
    constructor() {}

    getTicketById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const ticketEntity = await ticketService.getById(id);

            if (!ticketEntity) {
                createResponse(res, 404, { error: "Ticket not found" });
            } else {
                const ticketDTO = TicketDTO.fromEntity(ticketEntity);
                createResponse(res, 200, ticketDTO);
            }
        } catch (error) {
            next(error.message);
        }
    };

    //  crear un ticket
    createTicket = async (req, res, next) => {
        try {
            // Lógica para crear un nuevo ticket
            const newTicket = await ticketService.create(req.body);

            if (!newTicket) {
                createResponse(res, 500, { error: "Error creating ticket" });
            } else {
                const ticketDTO = TicketDTO.fromEntity(newTicket);
                createResponse(res, 201, ticketDTO);
            }
        } catch (error) {
            next(error.message);
        }
    };
}
