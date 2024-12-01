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
exports.Contact = void 0;
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
class Contact {
    constructor(name, last_name, email, phone) {
        this.uuid = (0, uuid_1.v4)();
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
    }
}
exports.Contact = Contact;
__decorate([
    (0, class_validator_1.IsUUID)("4"),
    __metadata("design:type", String)
], Contact.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Contact.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Contact.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsMobilePhone)(),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
//# sourceMappingURL=Contact.js.map