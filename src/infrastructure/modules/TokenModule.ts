import { Module } from "@nestjs/common";

import { TokenRepositoryAdapter } from "src/infrastructure/adapters/repositories/TokenRepositoryAdapter";

import { TokenService } from "src/application/services/TokenService";
import { GenerateJwtUseCaseImpl } from "src/application/usecases/token/GenerateJwtUseCaseImpl";
import { ValidateJwtUseCaseImpl } from "src/application/usecases/token/ValidateJwtUseCaseImpl";
import { GenerateCodeTokenUseCaseImpl } from "src/application/usecases/token/GenerateCodeTokenUseCaseImpl";
import { VerifyCodeTokenUseCaseImpl } from "src/application/usecases/token/VerifyCodeTokenUseCaseImpl";

@Module({
    providers: [
        TokenService,
        {
            provide: "GenerateJwtUseCase",
            useClass: GenerateJwtUseCaseImpl
        },
        {
            provide: "ValidateJwtUseCase",
            useClass: ValidateJwtUseCaseImpl
        },
        {
            provide: "GenerateCodeTokenUseCase",
            useClass: GenerateCodeTokenUseCaseImpl
        },
        {
            provide: "VerifyCodeTokenUseCase",
            useClass: VerifyCodeTokenUseCaseImpl
        },
        {
            provide: "TokenRepository",
            useClass: TokenRepositoryAdapter
        }
    ],
    exports: [TokenService]
})
export class TokenModule {}