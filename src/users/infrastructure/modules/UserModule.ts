import { Module } from "@nestjs/common";

import { ContactModule } from "src/contacts/infrastructure/modules/ContactModule";
import { NotificationTransportModule } from "src/users/infrastructure/modules/NotificationTransportModule";

import { CreateUserListener } from "src/users/infrastructure/adapters/listeners/CreateUserListener";
import { SearchUserListener } from "src/users/infrastructure/adapters/listeners/SearchUserListener";
import { UpdateUserListener } from "src/users/infrastructure/adapters/listeners/UpdateUserListener";
import { DeletUserListener } from "src/users/infrastructure/adapters/listeners/DeleteUserListener";
import { LoginListener } from "src/users/infrastructure/adapters/listeners/LoginListener";
import { MFAListener } from "src/users/infrastructure/adapters/listeners/MFAListener";
import { ChangePasswordListener } from "src/users/infrastructure/adapters/listeners/ChangePassword";
import { EmailForgotPasswordListener } from "src/users/infrastructure/adapters/listeners/EmailForgotPassword";
import { UpdatePasswordListener } from "src/users/infrastructure/adapters/listeners/UpdatePasswordListener";
import { VerifyCodeForgotPasswordListener } from "src/users/infrastructure/adapters/listeners/VerifyCodeForgotPasswordListener";
import { ResendCodeListener } from "src/users/infrastructure/adapters/listeners/ResendCodeListener";
import { VerifyNumberListener } from "src/users/infrastructure/adapters/listeners/VerifyNumberListener";

import { UserManagementService } from "src/users/application/services/UserManagementService";
import { UserSearchService } from "src/users/application/services/UserSearchService";
import { UserCreationService } from "src/users/application/services/UserCreationService";
import { UserUpdateService } from "src/users/application/services/UserUpdateService";
import { UserLoginService } from "src/users/application/services/UserLoginService";
import { UserDeletionService } from "src/users/application/services/UserDeletionService";
import { TokenService } from "src/users/application/services/TokenService";

import { GetByIdUseCaseImpl } from 'src/users/application/usecases/GetByIdUseCaseImpl';
import { GetByEmailUseCaseImpl } from "src/users/application/usecases/GetByEmailUseCaseImpl";
import { GetByNicknameUseCaseImpl } from "src/users/application/usecases/GetByNicknameUseCaseImpl";
import { GetByPhoneUseCaseImpl } from "src/users/application/usecases/GetByPhoneUseCaseImpl";
import { SearchUsersUseCaseImpl } from "src/users/application/usecases/SearchUsersUseCaseImpl";
import { CreateUserUseCaseImpl } from 'src/users/application/usecases/CreateUserUseCaseImpl';
import { UpdateUserUseCaseImpl } from 'src/users/application/usecases/UpdateUserUseCaseImpl';
import { DeleteUserUseCaseImpl } from 'src/users/application/usecases/DeleteUserUseCaseImpl';
import { LoginUserUseCaseImpl } from 'src/users/application/usecases/LoginUseCase';

import { UserRepositoryAdapter } from 'src/users/infrastructure/adapters/repositories/UserRepositoryAdapter';

@Module({
    imports: [NotificationTransportModule, ContactModule],
    controllers: [
        CreateUserListener,
        SearchUserListener,
        UpdateUserListener,
        DeletUserListener,
        LoginListener,
        MFAListener,
        ChangePasswordListener,
        EmailForgotPasswordListener,
        UpdatePasswordListener,
        VerifyCodeForgotPasswordListener,
        ResendCodeListener,
        VerifyNumberListener
    ],
    providers: [
        UserSearchService,
        UserCreationService,
        UserUpdateService,
        UserLoginService,
        UserDeletionService,
        TokenService,
        UserManagementService,
        {
            provide: 'GetByIdUseCase',
            useClass: GetByIdUseCaseImpl
        },
        {
            provide: 'GetByEmailUseCase',
            useClass: GetByEmailUseCaseImpl
        },
        {
            provide: 'GetByNicknameUseCase',
            useClass: GetByNicknameUseCaseImpl
        },
        {
            provide: 'GetByPhoneUseCase',
            useClass: GetByPhoneUseCaseImpl
        },
        {
            provide: 'SearchUsersUseCase',
            useClass: SearchUsersUseCaseImpl
        },
        {
            provide: 'CreateUserUseCase',
            useClass: CreateUserUseCaseImpl
        },
        {
            provide: 'UpdateUserUseCase',
            useClass: UpdateUserUseCaseImpl
        },
        {
            provide: 'DeleteUserUseCase',
            useClass: DeleteUserUseCaseImpl
        },
        {
            provide: "LoginUseCase",
            useClass: LoginUserUseCaseImpl
        },
        {
            provide: 'UserRepository',
            useClass: UserRepositoryAdapter
        }
    ],
})
export class UserModule{}