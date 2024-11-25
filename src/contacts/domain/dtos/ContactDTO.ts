export class ContactDTO {
    constructor(
        public uuid: string,
        public name: string,
        public last_name: string,
        public email: string,
        public phone: string,
        public code: string,
        public channel?: string,
    ){}
}