import { ClientProxy } from "@nestjs/microservices";
export declare class BuilderRequest {
    client: ClientProxy;
    channel: string;
    destination: string;
    message: string;
    contact_uuid: string;
    type: string;
    subject?: string;
    constructor(client: ClientProxy, channel: string, destination: string, message: string, contact_uuid: string, type: string, subject?: string);
}
