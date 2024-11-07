export interface DeleteUserUseCase {
    deleteUser(uuid: string): Promise<boolean>;
}