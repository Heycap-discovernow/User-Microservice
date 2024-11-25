export declare class Timestamp {
    private userCreatedAt;
    private userUpdatedAt?;
    private userDeletedAt?;
    setUserCreatedAt(date: Date): this;
    getUserCreatedAt(): Date;
    setUserUpdatedAt(date: Date): this;
    getUserUpdatedAt(): Date | undefined;
    setUserDeletedAt(date: Date): this;
    getUserDeletedAt(): Date | undefined;
}
