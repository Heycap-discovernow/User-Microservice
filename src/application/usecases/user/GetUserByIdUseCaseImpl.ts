import { UserDTO } from "src/domain/dtos/UserDTO";
import { GetUserByIdUseCase } from "src/domain/ports/in/user/GetUseByIdUseCase";
import { UserRepository } from "src/domain/ports/out/UserRepository";

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