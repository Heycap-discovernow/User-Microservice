export class ForgotPasswordResponse {
    public token: string;
    public message: string;
    constructor(token: string, message: string) {
        this.token = token;
        this.message = message;
    }
}