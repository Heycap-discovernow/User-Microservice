export class UserResponse {
    public uuid: string;
    public fullName: string;
    public nickname: string;
    public email: string;
    public phone: string | null;
    public avatar?: string | undefined;
    public contact_uuid?: string | undefined;
    constructor(
        uuid: string,
        name: string,
        lastName: string,
        nickname: string,
        email: string,
        phone: string,
        avatar?: string,
        contact_uuid?: string,
    ) {
        this.uuid = uuid;
        this.fullName = name.concat(' ', lastName);
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.avatar = avatar
        this.contact_uuid = contact_uuid
     }
}