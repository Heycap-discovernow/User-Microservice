import { Module } from "@nestjs/common";

import { TokenRepositoryAdapter } from "src/users/infrastructure/adapters/repositories/TokenRepositoryAdapter";

import { TokenService } from "src/users/application/services/TokenService";
import { GenerateJwtUseCaseImpl } from "src/users/application/usecases/token/GenerateJwtUseCaseImpl";
import { ValidateJwtUseCaseImpl } from "src/users/application/usecases/token/ValidateJwtUseCaseImpl";
import { GenerateCodeTokenUseCaseImpl } from "src/users/application/usecases/token/GenerateCodeTokenUseCaseImpl";
import { VerifyCodeTokenUseCaseImpl } from "src/users/application/usecases/token/VerifyCodeTokenUseCaseImpl";

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