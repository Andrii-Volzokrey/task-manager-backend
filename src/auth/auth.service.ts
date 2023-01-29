import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import UserType from 'src/auth/types/user.type';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(payload: SignUpDto) {
    const { ...data } = payload;

    const saltRounds = this.configService.get('bcrypt.rounds');
    data.password = await bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(data.password, salt));

    await this.userService.create(data);
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<UserType> {
    const user = await this.userService.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const { id, firstName, lastName, email } = user;
      return { id, firstName, lastName, email };
    }

    return null;
  }

  async login(user) {
    const payload = {
      email: user.email,
      sub: user.id,
      aud: 'http://localhost:3000',
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
