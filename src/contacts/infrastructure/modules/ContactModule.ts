import { Module } from "@nestjs/common";

import { NotificationTransportModule } from "src/users/infrastructure/modules/NotificationTransportModule";
import { ContactRepositoryAdapter } from "src/contacts/infrastructure/adapters/repositories/ContactRepositoryAdapter";
import { CreateContactListener } from "src/contacts/infrastructure/adapters/listeners/CreateContactListener";
import { VerifyNumberListener } from "src/contacts/infrastructure/adapters/listeners/VerifyNumberListener";

import { ContactService } from "src/contacts/application/services/ContactService";
import { TokenService } from "src/users/application/services/TokenService";
import { CreateContactUseCaseImpl } from "src/contacts/application/usecases/CreateContactUseCaseImpl";
import { SearchContactUseCaseImpl } from "src/contacts/application/usecases/SearchContactUseCaseImpl";
import { CreateCodeUseCaseImpl } from "src/contacts/application/usecases/CreateCodeUseCaseImpl";
import { SearchCodeUseCaseImpl } from "src/contacts/application/usecases/SearchCodeUseCaseImpl";

@Module({
    imports: [NotificationTransportModule],
    controllers: [
        CreateContactListener,
        VerifyNumberListener
    ],
    providers: [
        ContactService,
        TokenService,
        {
            provide: "CreateContactUseCase",
            useClass: CreateContactUseCaseImpl
        },
        {
            provide: "SearchContactUseCase",
            useClass: SearchContactUseCaseImpl
        },
        {
            provide: "CreateCodeUseCase",
            useClass: CreateCodeUseCaseImpl
        },
        {
            provide: "SearchCodeUseCase",
            useClass: SearchCodeUseCaseImpl
        },
        {
            provide: "ContactRepository",
            useClass: ContactRepositoryAdapter
        }
    ],
    exports: [ContactService]
})
export class ContactModule { }