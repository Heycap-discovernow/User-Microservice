import { TokenDTO } from "src/domain/dtos/TokenDTO";

export interface GetTokenUseCase {
    getToken(token: string, type: string): Promise<TokenDTO>;
}