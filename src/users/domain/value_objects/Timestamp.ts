import { IsDate, IsOptional } from "class-validator";

export class Timestamp {
    
    @IsDate()
    private userCreatedAt: Date;

    @IsOptional()
    @IsDate()
    private userUpdatedAt?: Date | undefined;

    @IsOptional()
    @IsDate()
    private userDeletedAt?: Date | undefined;

    public setUserCreatedAt(date: Date): this {
        this.userCreatedAt = date;
        return this;
    }

    public getUserCreatedAt(): Date {
        return this.userCreatedAt;
    }

    public setUserUpdatedAt(date: Date): this {
        this.userUpdatedAt = date;
        return this;
    }

    public getUserUpdatedAt(): Date | undefined {
        return this.userUpdatedAt;
    }

    public setUserDeletedAt(date: Date): this {
        this.userDeletedAt = date;
        return this;
    }

    public getUserDeletedAt(): Date | undefined {
        return this.userDeletedAt;
    }
}