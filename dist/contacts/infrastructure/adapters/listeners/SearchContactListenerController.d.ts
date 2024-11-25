import { ContactService } from "src/contacts/application/services/ContactService";
export declare class SearchContactListenerController {
    private readonly contactService;
    constructor(contactService: ContactService);
    searchContact(phone: string): Promise<import("../../../domain/models/Contact").Contact>;
}
