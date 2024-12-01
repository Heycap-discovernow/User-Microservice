import { ClientProxy } from "@nestjs/microservices";
import { ContactRequestDTO } from "src/contacts/application/dtos/ContactRequestDTO";
import { TokenService } from "src/users/application/services/TokenService";
import { CreateContactUseCase } from "src/contacts/domain/ports/in/CreateContactUseCase";
import { SearchContactUseCase } from "src/contacts/domain/ports/in/SearchContactUseCase";
import { CreateCodeUseCase } from "src/contacts/domain/ports/in/CreateCodeUseCase";
import { SearchCodeUseCase } from "src/contacts/domain/ports/in/SearchCodeUseCase";
import { Contact } from "src/contacts/domain/models/Contact";
export declare class ContactService implements CreateContactUseCase, SearchContactUseCase, CreateCodeUseCase {
    private readonly createContactUseCase;
    private readonly searchContactUseCase;
    private readonly createCodeUseCase;
    private readonly searchCodeUseCase;
    private readonly client;
    private readonly tokenService;
    constructor(createContactUseCase: CreateContactUseCase, searchContactUseCase: SearchContactUseCase, createCodeUseCase: CreateCodeUseCase, searchCodeUseCase: SearchCodeUseCase, client: ClientProxy, tokenService: TokenService);
    createContact(data: ContactRequestDTO): Promise<string>;
    searchContact(phone: string): Promise<Contact>;
    verifyNumber(code: string, contact_phone: string, type: string): Promise<boolean>;
    createCode(contact_uuid: string, code: string, type: string): Promise<string>;
    searchCode(contact_uuid: string, type: string): Promise<string>;
}
