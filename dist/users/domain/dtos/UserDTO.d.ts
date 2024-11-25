import { PhoneVerified } from "src/users/domain/value_objects/PhoneVerified";
import { Timestamp } from "src/users/domain/value_objects/Timestamp";
export declare class UserDTO {
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
    avatar?: string;
    constructor(uuid: string, contact_uuid: string, name: string, last_name: string, nickname: string, email: string, password: string, phone: string, phone_verified: PhoneVerified, timestamp: Timestamp, avatar?: string);
}
