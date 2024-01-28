import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
import { HttpResponse } from "../utils/http.response.js";


const httpResponse = new HttpResponse();


const service = new TicketService();

// Clase TicketController que extiende de Controllers
export default class TicketController extends Controllers {
    constructor() {
        super(service);
    };

    // Método para generar un ticket
    generarTicket = async (req, res, next) => {
        try {
            const { _user} = req.user; // Obtiene el id del usuario 
            const { cartId } = req.params; // Obtiene el id del carrito 

            // Genera un ticket utilizando el servicio
            const ticket = await service.generateTicket(_user, cartId);

            // Si no se pudo generar el ticket, devuelve un mensaje de error
            if (!ticket) {
                return (
                    httpResponse.NotFound(res, 'Error al generar el ticket')
                )
            } else {
                // Si se generó el ticket correctamente, devuelve el ticket generado
                return (
                    httpResponse.Ok(res, ticket)
                )
            };
        } catch (error) {
            next(error);
        };
    };
};
