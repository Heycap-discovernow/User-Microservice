import { JwtPayload } from "jsonwebtoken";
import { UserDTO } from "src/users/domain/dtos/UserDTO";
export declare class TokenService {
    constructor();
    generateJwtLogin(user: UserDTO): string;
    generateJwtForgotPassword(user: UserDTO): string;
    decodeJwt(token: string, key?: string): JwtPayload;
    generateCode(): string;
    generateCodeToken(uuid: string, code: string): string;
}
