import { Inject, Injectable } from "@nestjs/common";

import { VerifyCodeTokenUseCase } from "src/domain/ports/in/token/VerifyCodeTokenUseCase";
import { TokenRepository } from "src/domain/ports/out/TokenRepository";


@Injectable()
export class VerifyCodeTokenUseCaseImpl implements VerifyCodeTokenUseCase {
    constructor(
        @Inject('TokenRepository') private readonly codeRepository: TokenRepository
    ){}

    public async verifyCodeToken(token: string, userUUID: string): Promise<string> {
        const tokenFound = await this.codeRepository.searchToken(token, userUUID);
        return tokenFound;
    }
}