import { Inject, Injectable } from "@nestjs/common";

import { ValidateJwtUseCase } from "src/users/domain/ports/in/token/ValidateJwtUseCase";
import { TokenRepository } from "src/users/domain/ports/out/TokenRepository";

@Injectable()
export class ValidateJwtUseCaseImpl implements ValidateJwtUseCase {
    constructor(
        @Inject('TokenRepository') private readonly tokenRepository: TokenRepository
    ){}

    public async validateJwt(token: string): Promise<string> {
        // return await this.tokenRepository.validateToken(token);
        return "prueba";
    }
}