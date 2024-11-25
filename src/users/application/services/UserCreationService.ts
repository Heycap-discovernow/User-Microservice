import { Injectable, Inject } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { ContactService } from "src/contacts/application/services/ContactService";
import { UserRequest } from "src/users/application/dtos/request/UserRequest";

import { CreateUserUseCase } from "src/users/domain/ports/in/CreateUserUseCase";

@Injectable()
export class UserCreationService implements CreateUserUseCase {
    constructor(
        @Inject('CreateUserUseCase') private readonly createUserUseCase: CreateUserUseCase,
        private readonly contactService: ContactService,
    ) { }

    public async createUser(data: UserRequest): Promise<string> {
        const contact = await this.contactService.searchContact(data.contact.phone);
        if (!contact) {
            throw new RpcException("Contact not found, please make sure of create the contact first");
        }
        const userParameter = {
            contact: contact,
            nickname: data.nickname,
            password: data.password,
            avatar: data.avatar
        }
        const result = await this.createUserUseCase.createUser(userParameter);
        if (!result) {
            throw new RpcException("User not created");
        }

        return result;
    }
}