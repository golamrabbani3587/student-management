// app.module.ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { SocketIOModule } from './socketio/socket-io.config'
import { StudentModule } from './student/student.module';
import { typeOrmConfig } from './typeorm-config';
import { ValidationPipe } from './validations/validation.pipe';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SocketIOModule,
    AuthModule,
    StudentModule
  ],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe
  }],
})
export class AppModule {}

