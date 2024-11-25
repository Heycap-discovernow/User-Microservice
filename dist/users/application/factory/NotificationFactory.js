"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFactory = void 0;
const microservices_1 = require("@nestjs/microservices");
class NotificationFactory {
    getNotification() {
        switch (this.channel) {
            case "email":
                return this.emailNotification(this.destination, this.message, this.subject, this.contact_uuid);
            case "whatsapp":
                return this.whatsappNotification(this.destination, this.message, this.contact_uuid);
            default:
                throw new microservices_1.RpcException("Invalid Channel");
        }
    }
    emailNotification(destination, message, subject, contact_uuid) {
        const payload = {
            channel: this.channel,
            to: destination,
            subject: subject,
            message: message,
            contact_uuid: contact_uuid,
            type: this.type
        };
        return { send: () => this.client.emit('send-notification', payload) };
    }
    whatsappNotification(destination, message, contact_uuid) {
        const payload = {
            channel: this.channel,
            to: destination,
            message: message,
            contact_uuid: contact_uuid,
            type: this.type
        };
        return { send: () => this.client.emit('send-notification', payload) };
    }
}
exports.NotificationFactory = NotificationFactory;
//# sourceMappingURL=NotificationFactory.js.map