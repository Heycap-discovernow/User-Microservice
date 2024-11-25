import { Injectable, Inject } from "@nestjs/common";

import { UpdateUserDTO } from "src/users/domain/dtos/UpdateUserDTO";
import { UpdateUserUseCase } from "src/users/domain/ports/in/UpdateUserUseCase";
import { UserRepository } from "src/users/domain/ports/out/UserRepository";

@Injectable()
export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    public async updateUser(uuid: string, user: UpdateUserDTO): Promise<string> {
        const filteredUser = Object.keys(user).reduce((acc, key) => {
            if (user[key] !== undefined) {
                acc[key] = user[key]; // construccion de objeto con valores diferentes a undefined
            }
            return acc;
        }, {
            user_updated_at: new Date() // valor inicial con el que inicia el objeto
        });

        return await this.userRepository.updateUser(uuid, filteredUser);
    }
}