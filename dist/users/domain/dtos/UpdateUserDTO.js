"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDTO = void 0;
class UpdateUserDTO {
    constructor(user_updated_at, name, last_name, nickname, email, phone, password, avatar) {
        this.user_updated_at = user_updated_at;
        this.name = name;
        this.last_name = last_name;
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.avatar = avatar;
        this.user_updated_at = new Date();
    }
}
exports.UpdateUserDTO = UpdateUserDTO;
//# sourceMappingURL=UpdateUserDTO.js.map