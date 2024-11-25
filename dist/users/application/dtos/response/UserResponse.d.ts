export declare class UserResponse {
    uuid: string;
    fullName: string;
    nickname: string;
    email: string;
    phone: string | null;
    avatar?: string | undefined;
    constructor(uuid: string, name: string, lastName: string, nickname: string, email: string, phone: string, avatar?: string);
}
