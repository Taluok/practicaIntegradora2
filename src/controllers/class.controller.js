import { HttpResponse } from "../utils/http.response.js";
import { errorsDictionary } from "../utils/http.response.js";

const httpResponse = new HttpResponse();

export default class Controllers {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const items = await this.service.getAll();
            return httpResponse.Ok(res, items);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) {
                return httpResponse.NoEncontrado(res, "Lo siento, elemento no encontrado");
            } else {
                return httpResponse.Ok(res, item);
            }
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const newItem = await this.service.create(req.body);
            if (!newItem) {
                return httpResponse.NoEncontrado(res, errorsDictionary.ERROR_CREATE_ITEM);
            } else {
                return httpResponse.Ok(res, newItem);
            }
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) {
                return httpResponse.NoEncontrado(res, errorsDictionary.ERROR_UPDATE_ITEM);
            } else {
                const itemActualizado = await this.service.update(id, req.body);
                return httpResponse.Ok(res, itemActualizado);
            }
        } catch (error) {
            next(error.message);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) {
                return httpResponse.NoEncontrado(res, errorsDictionary.ERROR_DELETE_ITEM);
            } else {
                const itemEliminado = await this.service.delete(id);
                return httpResponse.Ok(res, itemEliminado);
            }
        } catch (error) {
            next(error.message);
        }
    };
};
