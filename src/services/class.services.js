export default class Services {
    constructor(dao) {
        this.dao = dao;
    };

    getAll = async () => {
        try{
            const items = await this.dao.getAll();
            if(!items) return false;
            else return items;
        }catch(error){
            throw new Error(error.message);
        };
    };

    getById = async (id) => {
        try{
            const item = await this.dao.getById(id);
            if(!item) return false;
            else return item;
        }catch(error){
            throw new Error(error.message);
        };
    };

    create = async (obj) => {
        try{
            const newItem = await this.dao.create(obj);
            if(!newItem) return false;
            else return newItem; 
        }catch(error){
            console.log(error);
        };
    };

    update = async (id, obj) => {
        try{
            let item = await this.dao.getById(id);
            if(!item) {
                return false;
            }else {
                const itemUpd = await this.dao.update(id, obj);   
                return itemUpd
            }
        }catch(error){
            throw new Error(error.message);
        };
    };

    async delete(id) {
        try {
            const itemDeleted = await this.dao.delete(id);
            return itemDeleted;
        } catch(error) {
            throw new Error(error.message);
        }
    };
};