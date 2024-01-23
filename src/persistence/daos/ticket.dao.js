import DAOInterface from "./DAOInterface.js";
import db from "../../config/database.js";

export default class TicketDAO extends DAOInterface {
    getAll = async () => {
        try {
            const query = "SELECT * FROM tickets";
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    };

    getById = async (id) => {
        try {
            const query = "SELECT * FROM tickets WHERE id = ?";
            const [rows] = await db.query(query, [id]);

            if (rows.length === 0) {
                return null;
            }

            return rows[0];
        } catch (error) {
            throw error;
        }
    };

    create = async (ticketData) => {
        try {
            const query = "INSERT INTO tickets (title, description) VALUES (?, ?)";
            const [result] = await db.query(query, [ticketData.title, ticketData.description]);

            if (result.affectedRows === 1) {
                const newTicketId = result.insertId;
                return await this.getById(newTicketId);
            }

            return null;
        } catch (error) {
            throw error;
        }
    };
}
