export interface ValidateJwtUseCase {
    validateJwt(token: string, type: string, user_uuid: string): Promise<string>;
}