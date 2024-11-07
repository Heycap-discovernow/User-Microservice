import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { NATS_SERVER } from "src/config";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'NOTIFICATIONS_TRANSPORT',
                transport: Transport.NATS,
                options: {
                    servers: [NATS_SERVER]
                },
            },
        ]),
    ],
    exports: [
        ClientsModule.register([
            {
                name: 'NOTIFICATIONS_TRANSPORT',
                transport: Transport.NATS,
                options: {
                    servers: [NATS_SERVER]
                },
            },
        ]),
    ],
})
export class NotificationTransportModule {}