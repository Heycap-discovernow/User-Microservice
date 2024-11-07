export interface VerifyCodeTokenUseCase {
    verifyCodeToken(userUUID: string, code: string): Promise<string>;
}