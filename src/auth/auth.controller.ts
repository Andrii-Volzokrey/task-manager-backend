import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/request-user.decorator';
import UserType from 'src/auth/types/user.type';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { LoginResponseDto } from 'src/auth/dto/login-response.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiNoContentResponse({
    status: 204,
    description: 'The record has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'User with provided email already exists.',
  })
  @HttpCode(204)
  @Post('/sign-up')
  async signUp(@Body() payload: SignUpDto) {
    return await this.authService.signUp(payload);
  }

  @ApiBody({
    description: 'User credentials',
    type: LoginDto,
  })
  @ApiOkResponse({
    description: 'User has been successfully authenticated.',
    type: LoginResponseDto,
  })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@User() user: UserType) {
    return this.authService.login(user);
  }
}
