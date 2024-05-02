import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Allow the following HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow the following headers
    next();
  });

  // Initialize csurf middleware
  // const csrfProtection = csurf({ cookie: true });

  // Apply csurf middleware
  // app.use(csrfProtection);

  await app.listen(3000);
}
bootstrap();
