import { ClientProxy } from "@nestjs/microservices";
import { UserRequest } from "src/users/application/dtos/request/UserRequest";
import { BuilderRequest } from "src/users/application/dtos/request/BuilderRequest";
import { UserResponse } from "src/users/application/dtos/response/UserResponse";
import { ForgotPasswordResponse } from "src/users/application/dtos/response/ForgotPasswordResponse";
import { UserSearchService } from "src/users/application/services/UserSearchService";
import { UserCreationService } from "src/users/application/services/UserCreationService";
import { UserUpdateService } from "src/users/application/services/UserUpdateService";
import { UserLoginService } from "src/users/application/services/UserLoginService";
import { UserDeletionService } from "src/users/application/services/UserDeletionService";
import { TokenService } from "src/users/application/services/TokenService";
import { ContactService } from "src/contacts/application/services/ContactService";
import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
export declare class UserManagementService {
    private readonly userSearchService;
    private readonly userCreationService;
    private readonly userUpdateService;
    private readonly userDeletionService;
    private readonly userLoginService;
    private readonly tokenService;
    private readonly contactService;
    constructor(userSearchService: UserSearchService, userCreationService: UserCreationService, userUpdateService: UserUpdateService, userDeletionService: UserDeletionService, userLoginService: UserLoginService, tokenService: TokenService, contactService: ContactService);
    getUserById(uuid: string): Promise<UserResponse>;
    getUserByEmail(email: string): Promise<UserResponse>;
    getUserByNickname(nickname: string): Promise<UserResponse>;
    getUserByPhone(phone: string): Promise<UserResponse>;
    searchUsers(text: string): Promise<UserResponse[]>;
    createUser(data: UserRequest, client: ClientProxy): Promise<string>;
    loginUser(email: string, password: string, client: ClientProxy): Promise<string>;
    mfaLogin(code: string, user_uuid: string, type: string): Promise<boolean>;
    updateUser(token: string, data: UpdateUserDTO): Promise<string>;
    changePassword(token: string, newPassword: string): Promise<string>;
    forgotPassword(email: string, client: ClientProxy): Promise<ForgotPasswordResponse>;
    deleteUser(token: string): Promise<boolean>;
    sendCode(builder: BuilderRequest): Promise<string>;
    resendCodeForgotPass(email: string, client: ClientProxy): Promise<ForgotPasswordResponse>;
}
