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
exports.Code = void 0;
const class_validator_1 = require("class-validator");
const TypeCode_1 = require("../value_objects/TypeCode");
class Code {
    constructor(contact_uuid, code, type, create_at) {
        this.contact_uuid = contact_uuid,
            this.code = code,
            this.type = type,
            this.created_at = create_at,
            this.expires_at = new Date(create_at.getTime() + 3 * 60 * 1000);
    }
}
exports.Code = Code;
__decorate([
    (0, class_validator_1.IsUUID)("4"),
    __metadata("design:type", String)
], Code.prototype, "contact_uuid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Code.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TypeCode_1.CodeType),
    __metadata("design:type", String)
], Code.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Code.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Code.prototype, "expires_at", void 0);
//# sourceMappingURL=Code.js.map