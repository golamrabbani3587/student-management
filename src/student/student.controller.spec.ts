// student.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let studentController: StudentController;
  let studentServiceMock: Partial<StudentService>;

  beforeEach(async () => {
    studentServiceMock = {
      findAll: jest.fn().mockReturnValue([]),
      getStudentCount: jest.fn().mockReturnValue([5]),
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Alice' }), // Mocking findOne method to return a resolved Promise with a student object
      create: jest.fn().mockResolvedValue({ id: 2, name: 'Bob' }), // Mocking create method to return a resolved Promise with a newly created student object
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [{ provide: StudentService, useValue: studentServiceMock }],
    }).compile();

    studentController = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(studentController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result = await studentController.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('count', () => {
    it('should return an array with a count value', async () => {
      const result = await studentController.getStudentCount();
      expect(result).toEqual([5]);
    });
  });

  describe('findOne', () => {
    it('should return a student object', async () => {
      const result = await studentController.findOne('1');
      expect(result).toEqual({ id: 1, name: 'Alice' });
    });
  });

  describe('create', () => {
    it('should return a newly created student object', async () => {
      const newStudentData = { name: 'Charlie' };
      const result = await studentController.create(newStudentData);
      expect(result).toEqual({ id: 2, name: 'Bob' });
    });
  });
});
