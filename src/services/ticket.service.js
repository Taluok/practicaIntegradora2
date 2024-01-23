import TicketDAO from "../persistence/daos/ticket.dao.js";

const ticketDAO = new TicketDAO();

export default class TicketService {
    getAll = async () => {
        try {
            return await ticketDAO.getAll();
        } catch (error) {
            throw error;
        }
    };

    getById = async (id) => {
        try {
            return await ticketDAO.getById(id);
        } catch (error) {
            throw error;
        }
    };

    create = async (ticketData) => {
        try {
            return await ticketDAO.create(ticketData);
        } catch (error) {
            throw error;
        }
    };
}


