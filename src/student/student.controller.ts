import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards,UsePipes,HttpException,HttpStatus } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Student } from './student.entity';
import { validate } from 'class-validator';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() studentData: Partial<Student>): Promise<Student> {
    const newStudent = new Student();
    Object.assign(newStudent, studentData);
    const errors = await validate(newStudent);
    if (errors.length > 0) {
      const errorMessage = errors.map(error => Object.values(error.constraints)).join(', ');
      throw new HttpException(`Validation failed: ${errorMessage}`, HttpStatus.BAD_REQUEST);
    }
    return this.studentService.create(newStudent);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get('/count')
  @UseGuards(JwtAuthGuard)
  async getStudentCount(): Promise<number> {
    return await this.studentService.getStudentCount();
  }

  @Get('/assignment')
  @UseGuards(JwtAuthGuard)
  async getStudentAssignment(): Promise<number> {
    return await this.studentService.getStudentAssignment();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() studentData: Partial<Student>): Promise<Student> {
    return this.studentService.update(+id, studentData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  softDelete(@Param('id') id: string): Promise<void> {
    return this.studentService.softDelete(+id);
  }
}
