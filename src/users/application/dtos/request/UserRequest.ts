import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";

export class UserRequest {
    constructor(
        public contact: ContactRequestDTO,
        public nickname: string,
        public password: string,
        public avatar?: string | null,
    ) { }
}