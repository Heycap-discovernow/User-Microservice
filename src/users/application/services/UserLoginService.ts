import { Injectable, Inject } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

import { compare } from "bcrypt";

import { User } from "src/users/domain/models/User";
import { LoginUserUseCase } from "src/users/domain/ports/in/LoginUserUseCase";

@Injectable()
export class UserLoginService implements LoginUserUseCase {
    constructor(
        @Inject('LoginUseCase') private readonly loginUserUseCase: LoginUserUseCase,
    ) { }

    public async login(email: string, password: string): Promise<User> {
        const user = await this.loginUserUseCase.login(email, password);
        if (!user) {
            throw new RpcException("User not found");
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new RpcException("invalid password");
        }
        return user;
    }

    public async verifyPhone(uuid: string, code: string): Promise<boolean> {
        // const user = await this.getById(uuid);
        // if (!user) {
        //     throw new RpcException("User not found");
        // }
        // console.log("status phone found", user.phone_verified, typeof user.phone_verified);
        // console.log("status phone expected", PhoneVerified.ACTIVE, typeof PhoneVerified.ACTIVE);
        // const token = await this.tokenService.verifyCodeToken(uuid, code);
        // // MANDAR A LLAMAR AL SERVICIO DE Token PARA VERIFICAR EL CODIGO (Cambiar)
        return true;
    }
}