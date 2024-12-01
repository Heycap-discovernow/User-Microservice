export interface SearchCodeUseCase {
    searchCode(contact_uuid: string, type: string): Promise<string>;
}
