import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateColumnDto {
  @ApiProperty()
  @IsString()
  title: string;
}
