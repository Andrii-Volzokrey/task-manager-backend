import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/request-user.decorator';
import UserType from 'src/auth/types/user.type';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() payload: SignUpDto) {
    await this.authService.signUp(payload);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@User() user: UserType) {
    return this.authService.login(user);
  }
}
