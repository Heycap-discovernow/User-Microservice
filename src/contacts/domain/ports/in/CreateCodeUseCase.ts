export interface CreateCodeUseCase {
    createCode(contact_uuid: string, code: string, type: string): Promise<string>
}