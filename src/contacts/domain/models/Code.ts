import { IsString, IsDate, IsEnum, Length, IsUUID } from "class-validator";
import { CodeType } from "src/contacts/domain/value_objects/TypeCode";

export class Code {
    @IsUUID("4")
    public contact_uuid: string;

    @IsString()
    public code: string;

    @IsEnum(CodeType)
    public type: CodeType;

    @IsDate()
    public created_at: Date;

    @IsDate()
    public expires_at: Date;

    constructor(
        contact_uuid: string,
        code: string,
        type: CodeType,
        create_at: Date
    ) {
        this.contact_uuid = contact_uuid,
        this.code = code,
        this.type = type,
        this.created_at = create_at,
        this.expires_at = new Date(create_at.getTime() + 3 * 60 * 1000)
    }
}