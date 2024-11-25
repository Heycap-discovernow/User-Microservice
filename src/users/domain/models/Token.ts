import { IsJWT, IsUUID, IsDate, IsEnum } from "class-validator";
import { Type } from "../value_objects/TokenType";
import { Status } from "../value_objects/TokenStatus";

export class Token {
    @IsJWT()
    public token: string;
    
    @IsUUID("4")
    public user_uuid: string;

    @IsEnum(Type)
    public type: Type;

    @IsDate()
    public created_at: Date;

    @IsDate()
    public expires_at: Date;

    @IsEnum(Status)
    public status: Status;

    constructor(token: string, user_uuid: string, type: Type, created_at: Date, expires_at: Date, status: Status) {
        this.token = token;
        this.user_uuid = user_uuid;
        this.type = type;
        this.created_at = created_at;
        this.expires_at = expires_at;
        this.status = status;
    }
}