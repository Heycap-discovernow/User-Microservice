"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const PhoneVerified_1 = require("../value_objects/PhoneVerified");
const Timestamp_1 = require("../value_objects/Timestamp");
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
class User {
    constructor(contact_uuid, name, last_name, nickname, email, password, phone, phone_verified, timestamp, avatar) {
        if (!this.isValidPhoneVerified(phone_verified)) {
            throw new Error("Invalid propertie to PhoneVerified");
        }
        this.uuid = (0, uuid_1.v4)();
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
    generateNewUUID() {
        this.uuid = (0, uuid_1.v4)() + Date.now().toString();
    }
    isValidPhoneVerified(value) {
        return Object.values(PhoneVerified_1.PhoneVerified).includes(value);
    }
}
exports.User = User;
__decorate([
    (0, class_validator_2.IsUUID)("4"),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_2.IsUUID)("4"),
    __metadata("design:type", String)
], User.prototype, "contact_uuid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_2.MaxLength)(30),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_2.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, class_validator_2.MinLength)(8),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_validator_2.IsMobilePhone)('es-MX'),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(PhoneVerified_1.PhoneVerified),
    __metadata("design:type", String)
], User.prototype, "phone_verified", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Timestamp_1.Timestamp),
    __metadata("design:type", Timestamp_1.Timestamp)
], User.prototype, "timestamp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_2.IsDataURI)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
//# sourceMappingURL=User.js.map