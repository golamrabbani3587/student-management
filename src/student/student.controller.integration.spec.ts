import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken library

describe('StudentController (Integration)', () => {
  let app;
  let authToken: string; // This will hold the Bearer token

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Function to generate JWT token
    function generateAuthToken() {
      const payload = {
        // Add any data you want to include in the token payload
        userId: '123456',
        username: 'john_doe',
        role: 'admin'
      };
      const secretKey = 'myjwt23456he'; // Secret key for signing the token
      return jwt.sign(payload, secretKey); // Generate JWT token
    }

    authToken = generateAuthToken(); // Generate JWT token
  });

  afterAll(async () => {
    await app.close();
  });

  it('/students (POST) should create a new student', async () => {
    const newStudentData = { name: 'John Doe', age:24, gender: 'male', course: "Computer Science", hobby:"Reading", admissionDate:"2024-05-02" };
    const response = await request(app.getHttpServer())
      .post('/students')
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the Bearer token
      .send(newStudentData)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual(expect.objectContaining({ id: expect.any(Number), name: 'John Doe' }));
  });

  it('/students (GET) should return an array of students', async () => {
    const response = await request(app.getHttpServer())
      .get('/students')
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the Bearer token
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('/students/:id (GET) should return a student object', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/3')
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the Bearer token
      .expect(HttpStatus.OK);
  
    // Check if the response body is an object
    expect(typeof response.body).toBe('object');
  });

  it('/students/count (GET) should return OK response', async () => {
    const response = await request(app.getHttpServer())
      .get('/students/count')
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the Bearer token
      .expect(HttpStatus.OK);
  
    // Check only the response status
    expect(response.status).toBe(HttpStatus.OK);
  });
});
