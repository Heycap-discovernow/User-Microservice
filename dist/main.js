"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const index_1 = require("./config/index");
const AppModule_1 = require("./AppModule");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(AppModule_1.AppModule, {
        transport: microservices_1.Transport.NATS,
        options: {
            servers: index_1.NATS_SERVER,
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true
    }));
    common_1.Logger.log("User-Microservice started");
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map