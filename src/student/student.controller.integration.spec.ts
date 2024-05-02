// student.controller.integration.spec.ts
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { HttpStatus } from '@nestjs/common';

describe('StudentController (Integration)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/students (POST) should create a new student', async () => {
    const newStudentData = { name: 'John Doe', age:24, gender: 'male', course: "Computer Science", hobby:"Reading", admissionDate:"2024-05-02" };
    const response = await request(app.getHttpServer())
      .post('/students')
      .send(newStudentData)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual(expect.objectContaining({ id: expect.any(Number), name: 'John Doe' }));
  });

  it('/students (GET) should return an array of students', async () => {
    const response = await request(app.getHttpServer())
      .get('/students')
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('/students/:id (GET) should return a student object', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/3')
      .expect(HttpStatus.OK);
  
    // Check if the response body is an object
    expect(typeof response.body).toBe('object');
  });


it('/students/count (GET) should return OK response', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/count')
      .expect(HttpStatus.OK);
  
    // Check only the response status
    expect(response.status).toBe(HttpStatus.OK);
  });

  

});
