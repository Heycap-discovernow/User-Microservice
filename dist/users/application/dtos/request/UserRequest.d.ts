import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";
export declare class UserRequest {
    contact: ContactRequestDTO;
    nickname: string;
    password: string;
    avatar?: string | null;
    constructor(contact: ContactRequestDTO, nickname: string, password: string, avatar?: string | null);
}
