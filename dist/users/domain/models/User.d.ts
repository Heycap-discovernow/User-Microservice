import { PhoneVerified } from "../value_objects/PhoneVerified";
import { Timestamp } from "../value_objects/Timestamp";
export declare class User {
    uuid: string;
    contact_uuid: string;
    name: string;
    last_name: string;
    nickname: string;
    email: string;
    password: string;
    phone: string;
    phone_verified: PhoneVerified;
    timestamp: Timestamp;
    avatar?: string | undefined;
    constructor(contact_uuid: string, name: string, last_name: string, nickname: string, email: string, password: string, phone: string, phone_verified: PhoneVerified, timestamp: Timestamp, avatar?: string);
    generateNewUUID(): void;
    private isValidPhoneVerified;
}
