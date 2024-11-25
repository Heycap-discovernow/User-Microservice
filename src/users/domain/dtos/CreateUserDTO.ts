import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";

export class CreateUserDTO {
    constructor(
        public contact: ContactDTO,
        public nickname: string,
        public password: string,
        public avatar?: string
    ) {}
}