export declare class ContactDTO {
    uuid: string;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    code: string;
    channel?: string;
    constructor(uuid: string, name: string, last_name: string, email: string, phone: string, code: string, channel?: string);
}
