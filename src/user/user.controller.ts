/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUsersDto } from './dto/create-users.dto';
// import { Request } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all User' })
  @ApiResponse({ status: 200, description: 'Get User successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Insert a User' })
  @ApiResponse({ status: 200, description: 'User successfully inserted', type: User })
  async createMultiple(@Body() createUsersDto: CreateUsersDto): Promise<User[]> {
    return this.userService.createMultiple(createUsersDto.users);
  }

  @Post('check-email')
  @ApiOperation({ summary: 'Check Email Unique' })
  @ApiResponse({ status: 200, description: 'Check Email Successfully', type: User })
  async checkEmailUnique(@Body('email') email: string) {
    const isUnique = await this.userService.isEmailUnique(email);
    return { isUnique };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a User' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() updateFields: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, updateFields);
  }
}
