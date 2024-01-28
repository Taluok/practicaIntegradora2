export default class TicketDTO {
    constructor(user, code, purchaseDatetime, amount, purchaser) {
        this.user = user;
        this.code = code;
        this.purchaseDatetime = purchaseDatetime;
        this.amount = amount;
        this.purchaser = purchaser;
    }

    static fromEntity(ticketEntity) {
        const { _user, code, purchase_datetime, amount, purchaser } = ticketEntity;
        return new TicketDTO(_user, code, purchase_datetime, amount, purchaser);
    }
}
