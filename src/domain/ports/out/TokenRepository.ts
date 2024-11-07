import { TokenDTO } from "src/domain/dtos/TokenDTO";

export interface TokenRepository {
    createToken(token: TokenDTO): Promise<string>;
    searchToken(token: string, userUUID: string): Promise<string>;
    getTokenByUser(uuid: string): Promise<string>;
    getTokenStatus(token: string): Promise<string>;
    getTokenType(token: string): Promise<string>;
}