import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
export declare class CreateUserDTO {
    contact: ContactDTO;
    nickname: string;
    password: string;
    avatar?: string;
    constructor(contact: ContactDTO, nickname: string, password: string, avatar?: string);
}
