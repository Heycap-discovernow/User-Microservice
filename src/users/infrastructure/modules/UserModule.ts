import { Module } from "@nestjs/common";

import { CreateUserListenerController } from "src/users/infrastructure/adapters/listeners/CreateUserListenerController";
import { UserRepositoryAdapter } from 'src/users/infrastructure/adapters/repositories/UserRepositoryAdapter';

import { UserService } from "src/users/application/services/UserService";
import { GetUserByIdUseCaseImpl } from 'src/users/application/usecases/user/GetUserByIdUseCaseImpl';
import { CreateUserUseCaseImpl } from 'src/users/application/usecases/user/CreateUserUseCaseImpl';
import { UpdateUserUseCaseImpl } from 'src/users/application/usecases/user/UpdateUserUseCaseImpl';
import { DeleteUserUseCaseImpl } from 'src/users/application/usecases/user/DeleteUserUseCaseImpl';
import { LoginUserUseCaseImpl } from 'src/users/application/usecases/user/LoginUseCase';
import { TokenModule } from "src/users/infrastructure/modules/TokenModule";
import { NotificationTransportModule } from "src/users/infrastructure/modules/NotificationTransportModule";

@Module({
    imports: [TokenModule, NotificationTransportModule],
    controllers: [CreateUserListenerController],
    providers: [
        UserService,
        {
            provide: 'GetUserByIdUseCase',
            useClass: GetUserByIdUseCaseImpl
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

