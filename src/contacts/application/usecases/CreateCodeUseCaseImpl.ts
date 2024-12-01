import { Injectable, Inject } from "@nestjs/common";

import { Code } from "src/contacts/domain/models/Code";
import { CreateCodeUseCase } from "src/contacts/domain/ports/in/CreateCodeUseCase"
import { CodeType } from "src/contacts/domain/value_objects/TypeCode";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";
import { validateOrReject } from "class-validator";

@Injectable()
export class CreateCodeUseCaseImpl implements CreateCodeUseCase {
    constructor(
        @Inject("ContactRepository") private readonly contactRepository: ContactRepository
    ){}

    public async createCode(contact_uuid: string, code: string, type: string): Promise<string> {
        const codeType = CodeType[type.toUpperCase() as keyof typeof CodeType];
        const codeRegistered = new Code(contact_uuid, code, codeType, new Date())
        await validateOrReject(codeRegistered);
        return await this.contactRepository.createCode(codeRegistered);
    }
}