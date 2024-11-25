export interface GenerateCodeTokenUseCase {
    generateCodeToken(token: string, user_uuid: string): Promise<string>;
}