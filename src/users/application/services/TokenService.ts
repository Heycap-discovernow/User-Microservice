import { Injectable } from "@nestjs/common";

import { sign, verify, JwtPayload } from "jsonwebtoken";

import { JWT_KEY } from "src/config";
import { UserDTO } from "src/users/domain/dtos/UserDTO";


@Injectable()
export class TokenService {
    constructor() { }

    public generateJwtLogin(user: UserDTO, code: string): string {
        const token = sign({
            uuid: user.uuid,
            email: user.email,
            phone: user.phone,
            fullname: user.name.concat(' ', user.last_name),
            nickname: user.nickname,
            avatar: user.avatar,
            mfa_code: code
        }, JWT_KEY, { expiresIn: '1h' });

        return token;
    }

    public generateJwtForgotPassword(user: UserDTO, code: string): string {
        const token = sign({
            uuid: user.uuid,
            email: user.email,
            code: code
        }, JWT_KEY, { expiresIn: '1m' });

        return token;
    }

    public decodeJwt(token: string): JwtPayload {
        return verify(token, JWT_KEY) as JwtPayload; //verify no solo decodifica el token, sino que tambien verifica su validez y firma
    }

    public generateCode(): string {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

}