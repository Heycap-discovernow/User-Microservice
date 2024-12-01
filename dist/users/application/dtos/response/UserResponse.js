"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
class UserResponse {
    constructor(uuid, name, lastName, nickname, email, phone, avatar, contact_uuid) {
        this.uuid = uuid;
        this.fullName = name.concat(' ', lastName);
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.avatar = avatar;
        this.contact_uuid = contact_uuid;
    }
}
exports.UserResponse = UserResponse;
//# sourceMappingURL=UserResponse.js.map