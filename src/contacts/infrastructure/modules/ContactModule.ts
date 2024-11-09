import { Module } from "@nestjs/common";

import { CreateContactListenerController } from "src/contacts/infrastructure/adapters/listeners/CreateContactListenerController";
import { ContactRepositoryAdapter } from "src/contacts/infrastructure/adapters/repositories/ContactRepositoryAdapter";
import { NotificationTransportModule } from "src/users/infrastructure/modules/NotificationTransportModule";

import { ContactService } from "src/contacts/application/services/ContactService";
import { CreateContactUseCaseImpl } from "src/contacts/application/usecases/CreateContactUseCaseImpl";
import { SearchContactUseCaseImpl } from "src/contacts/application/usecases/SearchContactUseCaseImpl";

@Module({
    imports: [NotificationTransportModule],
    controllers: [CreateContactListenerController],
    providers: [
        ContactService,
        {
            provide: "CreateContactUseCase",
            useClass: CreateContactUseCaseImpl
        },
        {
            provide: "SearchContactUseCase",
            useClass: SearchContactUseCaseImpl
        },
        {
            provide: "ContactRepository",
            useClass: ContactRepositoryAdapter
        }
    ],
    exports: [ContactService]
})
export class ContactModule { }