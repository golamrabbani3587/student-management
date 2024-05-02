import { Injectable,Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { RedisService } from '../redis/redis.service';
import { HobbyAssignmentService } from '../hobby-assignment/hobby-assignment.service';
import { Server } from 'socket.io';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly redisService: RedisService,
    private readonly hobbyAssignmentService: HobbyAssignmentService,
    @Inject('SOCKET_IO') private readonly io: Server,
  ) {}

  async create(studentData: Partial<Student>): Promise<Student> {
    await this.redisService.incrementCounter();
    return this.studentRepository.save(studentData);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const studentData = await this.studentRepository
      .createQueryBuilder('student')
      .where('student.id = :id', { id })
      .getOne();

    if (!studentData) {
      throw new NotFoundException('Student not found');
    }

    return studentData;
  }


  // async update(id: any, studentData: Partial<Student>): Promise<Student> {
  //   await this.studentRepository.update(id, studentData);
  //   const updatedStudent = await this.studentRepository.findOneOrFail(id);
    
  //   this.io.of('/').to('students').emit('student-updated', updatedStudent);
  
  //   await this.hobbyAssignmentService.assignRandomHobbyToStudent(id);
  //   return updatedStudent;
  // }

  
  async update(id: any, studentData: Partial<Student>): Promise<Student> {
    // Perform the update using the query builder
    await this.studentRepository
      .createQueryBuilder()
      .update(Student)
      .set(studentData)
      .where("id = :id", { id })
      .execute();

      const updatedStudent = await this.studentRepository
      .createQueryBuilder('student')
      .where('student.id = :id', { id })
      .getOne();
        this.io.of('/').to('students').emit('student-updated', updatedStudent);
  
        await this.hobbyAssignmentService.assignRandomHobbyToStudent(id);
    return updatedStudent;
  }

  
  async softDelete(id: number): Promise<void> {
    await this.redisService.decrementCounter();
    await this.studentRepository.softDelete(id);
  }

  async getStudentCount(): Promise<number> {
    return await this.redisService.getCounter();
  }
}
