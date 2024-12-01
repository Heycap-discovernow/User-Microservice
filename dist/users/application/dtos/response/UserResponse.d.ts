export declare class UserResponse {
    uuid: string;
    fullName: string;
    nickname: string;
    email: string;
    phone: string | null;
    avatar?: string | undefined;
    contact_uuid?: string | undefined;
    constructor(uuid: string, name: string, lastName: string, nickname: string, email: string, phone: string, avatar?: string, contact_uuid?: string);
}
