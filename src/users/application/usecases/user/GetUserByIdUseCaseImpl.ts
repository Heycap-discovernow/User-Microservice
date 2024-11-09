import { UserDTO } from "src/users/domain/dtos/UserDTO";
import { GetUserByIdUseCase } from "src/users/domain/ports/in/user/GetUseByIdUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class GetUserByIdUseCaseImpl implements GetUserByIdUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async getById(uuid: string): Promise<UserDTO> {
        return await this.userRepository.getById(uuid);
    }
}