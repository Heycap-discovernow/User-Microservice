export class UpdateUserRequest {
    constructor(
        public name?: string,
        public last_name?: string,
        public nickname?: string,
        public email?: string,
        public phone?: string,
        public avatar?: string
    ) { }
}