import { Injectable, Inject } from "@nestjs/common";

import { DeleteUserUseCase } from "src/users/domain/ports/in/DeleteUserUseCase";

@Injectable()
export class UserDeletionService implements DeleteUserUseCase {
    constructor(
        @Inject('DeleteUserUseCase') private readonly deleteUserUseCase: DeleteUserUseCase
    ) {}

    public async deleteUser(uuid: string): Promise<boolean> {
        return await this.deleteUserUseCase.deleteUser(uuid);
    }
}