import { ClientProxy } from "@nestjs/microservices";
interface Notify {
    send(): void;
}
export declare class NotificationFactory {
    client: ClientProxy;
    channel: string;
    destination: string;
    message: string;
    type: string;
    contact_uuid: string;
    subject?: string;
    getNotification(): Notify;
    emailNotification(destination: string, message: string, subject: string, contact_uuid: string): Notify;
    whatsappNotification(destination: string, message: string, contact_uuid: string): Notify;
}
export {};
