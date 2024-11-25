import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";

import { Builder } from "builder-pattern";

import { TRANSPORT } from "src/config";

import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { BuilderRequest } from "src/users/application/dtos/request/BuilderRequest";
import { UserResponse } from "src/users/application/dtos/response/UserResponse";
import { ForgotPasswordResponse } from "src/users/application/dtos/response/ForgotPasswordResponse";
import { NotificationFactory } from "src/users/application/factory/NotificationFactory";
import { UserSearchService } from "src/users/application/services/UserSearchService";
import { UserCreationService } from "src/users/application/services/UserCreationService";
import { UserUpdateService } from "src/users/application/services/UserUpdateService";
import { UserLoginService } from "src/users/application/services/UserLoginService";
import { UserDeletionService } from "src/users/application/services/UserDeletionService";
import { TokenService } from "src/users/application/services/TokenService";

import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";

@Injectable()
export class UserManagementService {
    constructor(
        private readonly userSearchService: UserSearchService,
        private readonly userCreationService: UserCreationService,
        private readonly userUpdateService: UserUpdateService,
        private readonly userDeletionService: UserDeletionService,
        private readonly userLoginService: UserLoginService,
        private readonly tokenService: TokenService,
        @Inject(TRANSPORT) private readonly client: ClientProxy
    ) { }

    public async getUserById(uuid: string): Promise<UserResponse> {
        const user = await this.userSearchService.getById(uuid);
        const userResponse = new UserResponse(
            user.uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.phone,
            user.avatar,
        );
        return userResponse;
    }

    public async getUserByEmail(email: string): Promise<UserResponse> {
        const user = await this.userSearchService.getByEmail(email);
        const userResponse = new UserResponse(
            user.uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.phone,
            user.avatar,
        );
        return userResponse;
    }

    public async getUserByNickname(nickname: string): Promise<UserResponse> {
        const user = await this.userSearchService.getByNickname(nickname);
        const userResponse = new UserResponse(
            user.uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.phone,
            user.avatar,
        );
        return userResponse;
    }

    public async getUserByPhone(phone: string): Promise<UserResponse> {
        const user = await this.userSearchService.getByPhone(phone);
        const userResponse = new UserResponse(
            user.uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.phone,
            user.avatar,
        );
        return userResponse;
    }

    public async searchUsers(text: string): Promise<UserResponse[]> {
        const users = await this.userSearchService.searchUsers(text);
        const usersResponse = users.map(user => new UserResponse(
            user.uuid,
            user.name,
            user.last_name,
            user.nickname,
            user.email,
            user.phone,
            user.avatar,
        ));
        return usersResponse;
    }

    public async createUser(data: UserRequest): Promise<string> {
        return await this.userCreationService.createUser(data);
    }

    public async loginUser(email: string, password: string): Promise<string> {
        const user =  await this.userLoginService.login(email, password);
        const code = this.tokenService.generateCode();
        const builder = {
            client: this.client,
            channel: "email",
            destination: user.email,
            subject: "Verification code to authorization of sign in",
            message: "Your verification code is: ".concat(code),
            contact_uuid: user.contact_uuid,
            type: 'authorization'
        }
        const sent = await this.sendCode(builder);
        if (!sent) {
            throw new RpcException("Error sending the verification code, please try again");

        }
        const token = this.tokenService.generateJwtLogin(user, code);
        return token;
    }

    public async mfaLogin(token: string, code: string): Promise<boolean> { //Posiblemente ya no sea necesaria esta funcion
        const payload = this.tokenService.decodeJwt(token);
        const uuid = payload.uuid;
        return await this.userLoginService.verifyPhone(uuid, code);
    }

    public async updateUser(token: string, data: UpdateUserDTO): Promise<string> {
        const payload = this.tokenService.decodeJwt(token);
        const uuid = payload.uuid;
        return await this.userUpdateService.updateUser(uuid, data);
    }

    public async changePassword(token: string, newPassword: string): Promise<string> {
        const payload = this.tokenService.decodeJwt(token);
        const uuid = payload.uuid;
        return await this.userUpdateService.changePassword(uuid, newPassword);
    }

    public async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
        const user = await this.userSearchService.getByEmail(email);
        if (!user) {
            throw new RpcException("Email not found, please try again");
        }
        const code = this.tokenService.generateCode();
        const builder = {
            client: this.client,
            channel: "email",
            destination: user.email,
            subject: "Verification code to change password",
            message: "Your verification code is: ".concat(code),
            contact_uuid: user.contact_uuid,
            type: 'confirmation'
        }
        const sent = await this.sendCode(builder);
        if (!sent) {
            throw new RpcException("Error sending the verification code, please try again");

        }
        const token = this.tokenService.generateJwtForgotPassword(user, code);
        return new ForgotPasswordResponse(token, "Please introduce the verification code that we sent to your email");
    }

    public async deleteUser(token: string): Promise<boolean> {
        const payload = this.tokenService.decodeJwt(token);
        const uuid = payload.uuid;
        return await this.userDeletionService.deleteUser(uuid);
    }

    public async sendCode(builder: BuilderRequest): Promise<string> {
        let notification: NotificationFactory;
        if (builder.channel == 'email') {
            notification = Builder(NotificationFactory)
                .client(builder.client)
                .channel("email")
                .destination(builder.destination)
                .subject(builder.subject)
                .message(builder.message)
                .contact_uuid(builder.contact_uuid)
                .type(builder.type)
                .build();

            notification.getNotification().send();
        } else {
            notification = Builder(NotificationFactory)
                .client(builder.client)
                .channel("whatsapp")
                .destination(builder.destination)
                .message(builder.message)
                .contact_uuid(builder.contact_uuid)
                .type(builder.type)
                .build();

            notification.getNotification().send();
        }

        return "Code sent";
    }

    public async resendCodeForgotPass(email: string): Promise<ForgotPasswordResponse> {
        const result = await this.forgotPassword(email);
        if(!result){
            throw new RpcException("Error to resend the code, please try again");
        }
        return new ForgotPasswordResponse(result.token, "Code resent".concat(" ", result.message));
    }

    // public async verifyNumber(code: string, contact_uuid: string): Promise<string> { //Posiblemente ya no sea necesaria esta funcion
    // } 
}