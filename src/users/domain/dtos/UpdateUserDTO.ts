export class UpdateUserDTO {
    constructor(
        public user_updated_at?: Date,
        public name?: string,
        public last_name?: string,
        public nickname?: string,
        public email?: string,
        public phone?: string,
        public password?: string,
        public avatar?: string
    ) {
        this.user_updated_at = new Date();
    }
}