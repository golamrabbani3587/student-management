import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { RedisService } from '../redis/redis.service'
import { HobbyAssignmentService } from '../hobby-assignment/hobby-assignment.service';
import { SocketIOModule } from '../socketio/socket-io.config';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), SocketIOModule],
  controllers: [StudentController],
  providers: [StudentService, RedisService,HobbyAssignmentService],
  exports: [RedisService,HobbyAssignmentService]
})
export class StudentModule {}
