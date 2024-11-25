"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderRequest = void 0;
class BuilderRequest {
    constructor(client, channel, destination, message, contact_uuid, type, subject) {
        this.client = client;
        this.channel = channel;
        this.destination = destination;
        this.message = message;
        this.contact_uuid = contact_uuid;
        this.type = type;
        this.subject = subject;
    }
}
exports.BuilderRequest = BuilderRequest;
//# sourceMappingURL=BuilderRequest.js.map