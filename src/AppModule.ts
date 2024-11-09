import { Module } from '@nestjs/common';

import { UserModule } from 'src/users/infrastructure/modules/UserModule';
import { ContactModule } from "src/contacts/infrastructure/modules/ContactModule";

@Module({
  imports: [ContactModule, UserModule],
})
export class AppModule {}