import { PhoneVerified } from "src/users/domain/value_objects/PhoneVerified";
import { Timestamp } from "src/users/domain/value_objects/Timestamp";

export class UserDTO {
    constructor(
        public uuid: string,
        public contact_uuid: string,
        public name: string,
        public last_name: string,
        public nickname: string,
        public email: string,
        public password: string,
        public phone: string,
        public phone_verified: PhoneVerified,
        public timestamp: Timestamp,
        public avatar?: string,
    ){}
}