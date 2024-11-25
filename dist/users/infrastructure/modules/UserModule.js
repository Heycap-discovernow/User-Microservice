"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const ContactModule_1 = require("../../../contacts/infrastructure/modules/ContactModule");
const NotificationTransportModule_1 = require("./NotificationTransportModule");
const CreateUserListener_1 = require("../adapters/listeners/CreateUserListener");
const SearchUserListener_1 = require("../adapters/listeners/SearchUserListener");
const UpdateUserListener_1 = require("../adapters/listeners/UpdateUserListener");
const DeleteUserListener_1 = require("../adapters/listeners/DeleteUserListener");
const LoginListener_1 = require("../adapters/listeners/LoginListener");
const MFAListener_1 = require("../adapters/listeners/MFAListener");
const ChangePassword_1 = require("../adapters/listeners/ChangePassword");
const EmailForgotPassword_1 = require("../adapters/listeners/EmailForgotPassword");
const UpdatePasswordListener_1 = require("../adapters/listeners/UpdatePasswordListener");
const VerifyCodeForgotPasswordListener_1 = require("../adapters/listeners/VerifyCodeForgotPasswordListener");
const ResendCodeListener_1 = require("../adapters/listeners/ResendCodeListener");
const VerifyNumberListener_1 = require("../adapters/listeners/VerifyNumberListener");
const UserManagementService_1 = require("../../application/services/UserManagementService");
const UserSearchService_1 = require("../../application/services/UserSearchService");
const UserCreationService_1 = require("../../application/services/UserCreationService");
const UserUpdateService_1 = require("../../application/services/UserUpdateService");
const UserLoginService_1 = require("../../application/services/UserLoginService");
const UserDeletionService_1 = require("../../application/services/UserDeletionService");
const TokenService_1 = require("../../application/services/TokenService");
const GetByIdUseCaseImpl_1 = require("../../application/usecases/GetByIdUseCaseImpl");
const GetByEmailUseCaseImpl_1 = require("../../application/usecases/GetByEmailUseCaseImpl");
const GetByNicknameUseCaseImpl_1 = require("../../application/usecases/GetByNicknameUseCaseImpl");
const GetByPhoneUseCaseImpl_1 = require("../../application/usecases/GetByPhoneUseCaseImpl");
const SearchUsersUseCaseImpl_1 = require("../../application/usecases/SearchUsersUseCaseImpl");
const CreateUserUseCaseImpl_1 = require("../../application/usecases/CreateUserUseCaseImpl");
const UpdateUserUseCaseImpl_1 = require("../../application/usecases/UpdateUserUseCaseImpl");
const DeleteUserUseCaseImpl_1 = require("../../application/usecases/DeleteUserUseCaseImpl");
const LoginUseCase_1 = require("../../application/usecases/LoginUseCase");
const UserRepositoryAdapter_1 = require("../adapters/repositories/UserRepositoryAdapter");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [NotificationTransportModule_1.NotificationTransportModule, ContactModule_1.ContactModule],
        controllers: [
            CreateUserListener_1.CreateUserListener,
            SearchUserListener_1.SearchUserListener,
            UpdateUserListener_1.UpdateUserListener,
            DeleteUserListener_1.DeletUserListener,
            LoginListener_1.LoginListener,
            MFAListener_1.MFAListener,
            ChangePassword_1.ChangePasswordListener,
            EmailForgotPassword_1.EmailForgotPasswordListener,
            UpdatePasswordListener_1.UpdatePasswordListener,
            VerifyCodeForgotPasswordListener_1.VerifyCodeForgotPasswordListener,
            ResendCodeListener_1.ResendCodeListener,
            VerifyNumberListener_1.VerifyNumberListener
        ],
        providers: [
            UserSearchService_1.UserSearchService,
            UserCreationService_1.UserCreationService,
            UserUpdateService_1.UserUpdateService,
            UserLoginService_1.UserLoginService,
            UserDeletionService_1.UserDeletionService,
            TokenService_1.TokenService,
            UserManagementService_1.UserManagementService,
            {
                provide: 'GetByIdUseCase',
                useClass: GetByIdUseCaseImpl_1.GetByIdUseCaseImpl
            },
            {
                provide: 'GetByEmailUseCase',
                useClass: GetByEmailUseCaseImpl_1.GetByEmailUseCaseImpl
            },
            {
                provide: 'GetByNicknameUseCase',
                useClass: GetByNicknameUseCaseImpl_1.GetByNicknameUseCaseImpl
            },
            {
                provide: 'GetByPhoneUseCase',
                useClass: GetByPhoneUseCaseImpl_1.GetByPhoneUseCaseImpl
            },
            {
                provide: 'SearchUsersUseCase',
                useClass: SearchUsersUseCaseImpl_1.SearchUsersUseCaseImpl
            },
            {
                provide: 'CreateUserUseCase',
                useClass: CreateUserUseCaseImpl_1.CreateUserUseCaseImpl
            },
            {
                provide: 'UpdateUserUseCase',
                useClass: UpdateUserUseCaseImpl_1.UpdateUserUseCaseImpl
            },
            {
                provide: 'DeleteUserUseCase',
                useClass: DeleteUserUseCaseImpl_1.DeleteUserUseCaseImpl
            },
            {
                provide: "LoginUseCase",
                useClass: LoginUseCase_1.LoginUserUseCaseImpl
            },
            {
                provide: 'UserRepository',
                useClass: UserRepositoryAdapter_1.UserRepositoryAdapter
            }
        ],
    })
], UserModule);
//# sourceMappingURL=UserModule.js.map