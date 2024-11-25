import { PhoneVerified } from "../value_objects/PhoneVerified";
import { Timestamp } from "../value_objects/Timestamp";

import { IsString, IsOptional, ValidateNested, IsEnum, } from "class-validator"; // Type validators
import { IsUUID, IsEmail, IsMobilePhone, MaxLength, MinLength, IsDataURI } from "class-validator"; // String validators
import { Type } from "class-transformer";
import { v4 as uuidv4 } from 'uuid';

export class User {
    @IsUUID("4")
    public uuid: string;

    @IsUUID("4")
    public contact_uuid: string;
    
    @IsString()
    public name: string;
    
    @IsString()
    public last_name: string;

    @MaxLength(30)
    public nickname: string;
    
    @IsEmail()
    public email: string;
    
    @MinLength(8)
    public password: string;
    
    @IsMobilePhone('es-MX')
    public phone: string;
    
    @IsEnum(PhoneVerified)
    public phone_verified: PhoneVerified;
    
    @ValidateNested()
    @Type(() => Timestamp)
    public timestamp: Timestamp;

    @IsOptional()
    @IsDataURI()
    public avatar?: string | undefined;
    
    constructor(
        contact_uuid: string,
        name: string,
        last_name: string,
        nickname: string,
        email: string,
        password: string,
        phone: string,
        phone_verified: PhoneVerified,
        timestamp: Timestamp,
        avatar?: string
    ){
        if(!this.isValidPhoneVerified(phone_verified)){
            throw new Error("Invalid propertie to PhoneVerified");
        }
        this.uuid = uuidv4();
        this.contact_uuid = contact_uuid;
        this.name = name;
        this.last_name = last_name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.phone_verified = phone_verified;
        this.timestamp = timestamp;
        this.avatar = avatar;
    }

    public generateNewUUID(): void {
        this.uuid = uuidv4() + Date.now().toString();
    }

    private isValidPhoneVerified(value: PhoneVerified): value is PhoneVerified {
        return Object.values(PhoneVerified).includes(value);
    }
}