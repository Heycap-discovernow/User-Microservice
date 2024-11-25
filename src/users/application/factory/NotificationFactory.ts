import { ClientProxy, RpcException } from "@nestjs/microservices";

interface Notify {
    send(): void;
}

export class NotificationFactory {
    public client: ClientProxy;
    public channel: string;
    public destination: string;
    public message: string;
    public type: string;
    public contact_uuid: string;
    public subject?: string;

    public getNotification(): Notify {
        switch (this.channel) {
            case "email":
                return this.emailNotification(this.destination, this.message, this.subject, this.contact_uuid);
            case "whatsapp":
                return this.whatsappNotification(this.destination, this.message, this.contact_uuid);
            default:
                throw new RpcException("Invalid Channel");
        }
    }

    public emailNotification(destination: string, message: string, subject: string, contact_uuid: string): Notify {
        const payload = {
            channel: this.channel,
            to: destination,
            subject: subject,
            message: message,
            contact_uuid: contact_uuid,
            type: this.type
        }

        return { send: () => this.client.emit('send-notification', payload) }
    }

    public whatsappNotification(destination: string, message: string, contact_uuid: string): Notify {
        const payload = {
            channel: this.channel,
            to: destination,
            message: message,
            contact_uuid: contact_uuid,
            type: this.type
        }

        return { send: () => this.client.emit('send-notification', payload) }
    }
}
