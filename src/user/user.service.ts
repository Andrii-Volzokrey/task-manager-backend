import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: SignUpDto) {
    const user = await this.findOne({ email: data.email });
    if (user) {
      throw new ConflictException('User with provided email already exists.');
    }

    const entity = this.userRepository.create({ ...data });
    return this.userRepository.save(entity);
  }

  async findOne(where: FindOptionsWhere<UserEntity>) {
    return this.userRepository.findOne({ where });
  }
}
