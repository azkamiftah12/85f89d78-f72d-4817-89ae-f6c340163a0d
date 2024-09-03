/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Delete, Req, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Request } from 'express';
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

  @Get(':id')
  @ApiOperation({ summary: 'Get a User' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Get a User successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Insert a User' })
  @ApiResponse({ status: 200, description: 'User successfully inserted', type: User })
  create(@Req() request: Request): Promise<User> {
    const { firstName, lastName, position, phone, email } = request.body;
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.position = position;
    user.phone = phone;
    user.email = email;
    return this.userService.createUser(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a User' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User successfully updated', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: number,
    @Body() updateFields: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, updateFields);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}
