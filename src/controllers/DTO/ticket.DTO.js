export default class TicketDTO {
    constructor(id, code, purchaseDatetime, amount, purchaser) {
        this.id = id;
        this.code = code;
        this.purchaseDatetime = purchaseDatetime;
        this.amount = amount;
        this.purchaser = purchaser;
    }

    static fromEntity(ticketEntity) {
        const { _id, code, purchase_datetime, amount, purchaser } = ticketEntity;
        return new TicketDTO(_id, code, purchase_datetime, amount, purchaser);
    }
}
