import { ContactService } from "src/contacts/application/services/ContactService";
import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { CreateUserUseCase } from "src/users/domain/ports/in/CreateUserUseCase";
export declare class UserCreationService implements CreateUserUseCase {
    private readonly createUserUseCase;
    private readonly contactService;
    constructor(createUserUseCase: CreateUserUseCase, contactService: ContactService);
    createUser(data: UserRequest): Promise<string>;
}
