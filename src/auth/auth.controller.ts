import { Controller, Get,Query, ParseIntPipe,Post, Body,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Admin } from './admin.entity';
// import { JwtAuthGuard } from '../user/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: AuthService) {}
  @Post('register')
  async register(@Body() user: Admin): Promise<Admin> {
    return this.usersService.register(user);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<{ accessToken: any }> {
    return this.usersService.login(email, password);
  }
}
