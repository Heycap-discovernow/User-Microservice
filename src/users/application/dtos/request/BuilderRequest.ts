import { ClientProxy } from "@nestjs/microservices";

export class BuilderRequest {
    constructor(
        public client: ClientProxy,
        public channel: string,
        public destination: string,
        public message: string,
        public contact_uuid: string,
        public type: string,
        public subject?: string
    ) { }
}