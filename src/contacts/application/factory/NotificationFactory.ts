import { ClientProxy, RpcException } from "@nestjs/microservices";

interface Notify {
    send(): void;
}

export class NotificationFactory {
    public client: ClientProxy;
    public type: string;
    public destination: string;
    public message: string;
    public subject?: string;
    public user_uuid?: string;
    public contact_uuid?: string;

    public getNotification(): Notify {
        switch (this.type) {
            case "email":
                return this.emailNotification(this.destination, this.message, this.subject, this.user_uuid, this.contact_uuid);
            case "whatsapp":
                return this.whatsappNotification(this.destination, this.message, this.user_uuid, this.contact_uuid);
            default:
                throw new RpcException("Invalid Channel");
        }
    }

    public emailNotification(destination: string, message: string, subject: string, user_uuid?: string, contact_uuid?: string): Notify {
        const payload = {
            to: destination,
            message: message,
            subject: subject,
            user_uuid: user_uuid,
            contact_uuid: contact_uuid,
        }

        return { send: () => this.client.emit('send-email', payload) }
    }

    public whatsappNotification(destination: string, message: string, user_uuid?: string, contact_uuid?: string): Notify {
        const payload = {
            to: destination,
            message: message,
            user_uuid: user_uuid,
            contact_uuid: contact_uuid,
        }

        return { send: () => this.client.emit('send-whatsapp', payload) }
    }
}
