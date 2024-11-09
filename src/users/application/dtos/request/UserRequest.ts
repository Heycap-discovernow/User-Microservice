export class UserRequest {
    constructor(
        public contact_uuid: string,
        public nickname: string,
        public password: string,
        public avatar?: string | null,
    ){}
}