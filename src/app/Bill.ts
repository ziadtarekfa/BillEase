export default class Bill {
    id: string;
    status: string;
    type: string;
    issuedDate: string;

    constructor(id: string, status: string, type: string, issuedDate: string) {
        this.id = id;
        this.status = status;
        this.type = type;
        this.issuedDate = issuedDate;
    }
}