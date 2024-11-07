export interface GenerateJwtUseCase {
    generateJwt(payload: string, userUUID: string, secretKey: string): Promise<string>;
}