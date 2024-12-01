import { Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";

import { Builder } from "builder-pattern";

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
import { ContactService } from "src/contacts/application/services/ContactService";

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
        private readonly contactService: ContactService
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
            user.contact_uuid
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

    public async createUser(data: UserRequest, client: ClientProxy): Promise<string> {
        const result = await this.userCreationService.createUser(data);
        if (!result) {
            throw new RpcException("User not created");
        }
        return result;
    }

    public async loginUser(email: string, password: string, client: ClientProxy): Promise<string> {
        const user =  await this.userLoginService.login(email, password);
        const code = this.tokenService.generateCode();
        const codeToken = this.tokenService.generateCodeToken(user.contact_uuid, code)
        const saveCode = await this.contactService.createCode(user.contact_uuid, codeToken, 'LOGIN')
        const builder = {
            client: client,
            channel: "whatsapp",
            destination: user.phone,
            // subject: "Verification code to authorization of sign in",
            message: code,
            contact_uuid: user.contact_uuid,
            type: 'authorization'
        }
        const sent = await this.sendCode(builder);
        if (!sent) {
            throw new RpcException("Error sending the verification code, please try again");

        }
        const token = this.tokenService.generateJwtLogin(user);
        return token;
    }

    public async mfaLogin(code: string, user_uuid: string, type: string): Promise<boolean> { //Posiblemente ya no sea necesaria esta funcion
        const user = await this.getUserById(user_uuid);
        const codeFound = await this.contactService.searchCode(user.contact_uuid, type);
        const codeDecoded = this.tokenService.decodeJwt(codeFound, user.contact_uuid);
        if (typeof codeDecoded === 'object' && 'code' in codeDecoded) {
            if (code === codeDecoded.code) {
                return true;
            }
        }
        return false;
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

    public async forgotPassword(email: string, client: ClientProxy): Promise<ForgotPasswordResponse> {
        const user = await this.userSearchService.getByEmail(email);
        if (!user) {
            throw new RpcException("Email not found, please try again");
        }
        const code = this.tokenService.generateCode();
        const builder = {
            client: client,
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
        const token = this.tokenService.generateJwtForgotPassword(user);
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

    public async resendCodeForgotPass(email: string, client: ClientProxy): Promise<ForgotPasswordResponse> {
        const result = await this.forgotPassword(email, client);
        if(!result){
            throw new RpcException("Error to resend the code, please try again");
        }
        return new ForgotPasswordResponse(result.token, "Code resent".concat(" ", result.message));
    }
}