import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { NATS_SERVER, TRANSPORT } from "src/config";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: TRANSPORT,
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
                name: TRANSPORT,
                transport: Transport.NATS,
                options: {
                    servers: [NATS_SERVER]
                },
            },
        ]),
    ],
})
export class NotificationTransportModule {}