import { Token } from "src/domain/models/Token";
import { Type } from "src/domain/value_objects/TokenType";
import { Status } from "src/domain/value_objects/TokenStatus";
import { GenerateCodeTokenUseCase } from "src/domain/ports/in/token/GenerateCodeTokenUseCase";
import { TokenRepository } from "src/domain/ports/out/TokenRepository";

import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GenerateCodeTokenUseCaseImpl implements GenerateCodeTokenUseCase {
    constructor(
        @Inject('TokenRepository') private readonly tokenRepository: TokenRepository
    ){}

    public async generateCodeToken(token: string, user_uuid: string): Promise<string> {
        const create_at = new Date();
        const expires_at = new Date(create_at.getTime() + 600000);
        const newToken = new Token(
            token, 
            user_uuid,
            Type.CODE,
            create_at,
            expires_at,
            Status.ACTIVE
        );
        return await this.tokenRepository.createToken(newToken);
    }
}