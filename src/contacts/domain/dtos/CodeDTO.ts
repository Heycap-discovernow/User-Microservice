import { CodeType } from "src/contacts/domain/value_objects/TypeCode";

export class CodeDTO {
    constructor(
        public contact_uuid: string,
        public code: string,
        public type: CodeType,
        public created_at: Date,
        public expires_at: Date,
    ) { }
}