import { ContactService } from "src/contacts/application/services/ContactService";
export declare class VerifyNumberListener {
    private readonly contactService;
    constructor(contactService: ContactService);
    verifyNumberListener(payload: {
        code: string;
        phone: string;
        type: string;
    }): Promise<any>;
}
