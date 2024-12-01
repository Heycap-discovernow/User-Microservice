import { IsString, IsEmail, IsMobilePhone, IsUUID, Length } from "class-validator";
import { v4 as uuidv4 } from 'uuid';

export class Contact {
    @IsUUID("4")
    public uuid: string;

    @IsString()
    public name: string;

    @IsString()
    public last_name: string;

    @IsEmail()
    public email: string;

    @IsMobilePhone()
    public phone: string;

    // @IsString()
    // @Length(4, 4)
    // public code: string;

    constructor(name: string, last_name: string, email: string, phone: string){
        this.uuid = uuidv4();
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        // this.code =  Math.floor(1000 + Math.random() * 9000).toString();
    }
}