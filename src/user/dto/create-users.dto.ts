/* eslint-disable prettier/prettier */
import { CreateUserDto } from './create-user.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    users: CreateUserDto[];
}
