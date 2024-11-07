import { Module } from "@nestjs/common";

import { CreateContactListenerController } from "src/infrastructure/adapters/listeners/CreateContactListenerController";
import { ContactRepositoryAdapter } from "src/infrastructure/adapters/repositories/ContactRepositoryAdapter";
import { NotificationTransportModule } from "src/infrastructure/modules/NotificationTransportModule";

import { ContactService } from "src/application/services/ContactService";
import { CreateContactUseCaseImpl } from "src/application/usecases/contact/CreateContactUseCaseImpl";
import { SearchContactUseCaseImpl } from "src/application/usecases/contact/SearchContactUseCaseImpl";

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