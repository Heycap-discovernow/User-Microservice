export class ContactRequestDTO {
    constructor(
        public name: string,
        public last_name: string,
        public email: string,
        public phone: string,
    ){}
}