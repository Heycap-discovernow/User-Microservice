import { CodeType } from "src/contacts/domain/value_objects/TypeCode";
export declare class Code {
    contact_uuid: string;
    code: string;
    type: CodeType;
    created_at: Date;
    expires_at: Date;
    constructor(contact_uuid: string, code: string, type: CodeType, create_at: Date);
}
