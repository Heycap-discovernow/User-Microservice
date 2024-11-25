import { TokenDTO } from "src/users/domain/dtos/TokenDTO";

export interface GetTokenUseCase {
    getToken(token: string, type: string): Promise<TokenDTO>;
}