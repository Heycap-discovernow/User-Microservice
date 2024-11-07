import { Module } from '@nestjs/common';
import { UserModule } from './infrastructure/modules/UserModule';

@Module({
  imports: [UserModule ],
})
export class AppModule {}