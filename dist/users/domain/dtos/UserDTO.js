"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor(uuid, contact_uuid, name, last_name, nickname, email, password, phone, phone_verified, timestamp, avatar) {
        this.uuid = uuid;
        this.contact_uuid = contact_uuid;
        this.name = name;
        this.last_name = last_name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.phone_verified = phone_verified;
        this.timestamp = timestamp;
        this.avatar = avatar;
    }
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=UserDTO.js.map