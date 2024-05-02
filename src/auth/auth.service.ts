// user.service.ts
import { Injectable } from '@nestjs/common';
import {ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}


  async register(admin: Admin): Promise<Admin> {
    const existingUser = await this.adminRepository.findOne({ where: { email: admin.email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const newUser = this.adminRepository.create({ ...admin, password: hashedPassword });
    return this.adminRepository.save(newUser);
  }


  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.adminRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {accessToken: accessToken}
  }
}


