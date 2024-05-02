import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from './auth/admin.entity';
import { Student } from './student/student.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'test',
  entities: [Admin, Student],
  synchronize: true,
};

export default typeOrmConfig;
