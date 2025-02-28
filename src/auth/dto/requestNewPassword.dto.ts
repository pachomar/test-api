import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestNewPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
