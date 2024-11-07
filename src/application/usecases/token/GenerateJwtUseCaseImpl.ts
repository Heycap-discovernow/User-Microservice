import { Inject, Injectable } from "@nestjs/common";

import { Token } from "src/domain/models/Token";
import { Type } from "src/domain/value_objects/TokenType";
import { Status } from "src/domain/value_objects/TokenStatus";
import { GenerateJwtUseCase } from "src/domain/ports/in/token/GenerateJwtUseCase";
import { TokenRepository } from "src/domain/ports/out/TokenRepository";

@Injectable()
export class GenerateJwtUseCaseImpl implements GenerateJwtUseCase {
    constructor(
        @Inject('TokenRepository') private readonly tokenRepository: TokenRepository
    ){}

    public async generateJwt(userUUID: string, token: string): Promise<string> {
        const create_at = new Date();
        const expires_at = new Date(create_at.getTime() + 600000)
        const newToken = new Token(
            token,
            userUUID,
            Type.VALID,
            create_at,
            expires_at,
            Status.ACTIVE
        )
        return await this.tokenRepository.createToken(newToken);
    }
}