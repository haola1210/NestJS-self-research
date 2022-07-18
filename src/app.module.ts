import { Module } from '@nestjs/common';
import { TodoModule } from './features/todo/todo.module';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
