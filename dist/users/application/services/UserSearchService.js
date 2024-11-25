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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSearchService = void 0;
const common_1 = require("@nestjs/common");
let UserSearchService = class UserSearchService {
    constructor(getByIdUseCase, getByEmailUseCase, getByNicknameUseCase, getByPhoneUseCase, searchUsersUseCase) {
        this.getByIdUseCase = getByIdUseCase;
        this.getByEmailUseCase = getByEmailUseCase;
        this.getByNicknameUseCase = getByNicknameUseCase;
        this.getByPhoneUseCase = getByPhoneUseCase;
        this.searchUsersUseCase = searchUsersUseCase;
    }
    async getById(uuid) {
        return await this.getByIdUseCase.getById(uuid).catch(() => { return null; });
    }
    async getByNickname(nickname) {
        return await this.getByNicknameUseCase.getByNickname(nickname).catch(() => { return null; });
    }
    async getByEmail(email) {
        return await this.getByEmailUseCase.getByEmail(email).catch(() => { return null; });
    }
    async getByPhone(phone) {
        return await this.getByPhoneUseCase.getByPhone(phone).catch(() => { return null; });
    }
    async searchUsers(text) {
        return await this.searchUsersUseCase.searchUsers(text).catch(() => { return []; });
    }
};
exports.UserSearchService = UserSearchService;
exports.UserSearchService = UserSearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('GetByIdUseCase')),
    __param(1, (0, common_1.Inject)('GetByEmailUseCase')),
    __param(2, (0, common_1.Inject)('GetByNicknameUseCase')),
    __param(3, (0, common_1.Inject)('GetByPhoneUseCase')),
    __param(4, (0, common_1.Inject)("SearchUsersUseCase")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], UserSearchService);
//# sourceMappingURL=UserSearchService.js.map