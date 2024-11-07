import { Module } from "@nestjs/common";

import { CreateUserListenerController } from "src/infrastructure/adapters/listeners/CreateUserListenerController";
import { UserRepositoryAdapter } from 'src/infrastructure/adapters/repositories/UserRepositoryAdapter';

import { UserService } from "src/application/services/UserService";
import { GetUserByIdUseCaseImpl } from 'src/application/usecases/user/GetUserByIdUseCaseImpl';
import { CreateUserUseCaseImpl } from 'src/application/usecases/user/CreateUserUseCaseImpl';
import { UpdateUserUseCaseImpl } from 'src/application/usecases/user/UpdateUserUseCaseImpl';
import { DeleteUserUseCaseImpl } from 'src/application/usecases/user/DeleteUserUseCaseImpl';
import { LoginUserUseCaseImpl } from 'src/application/usecases/user/LoginUseCase';
import { ContactModule } from "src/infrastructure/modules/ContactModule";
import { TokenModule } from "src/infrastructure/modules/TokenModule";
import { NotificationTransportModule } from "src/infrastructure/modules/NotificationTransportModule";

@Module({
    imports: [ContactModule, TokenModule, NotificationTransportModule],
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

