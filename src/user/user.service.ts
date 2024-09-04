/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    return !existingUser;
  }

  async createMultiple(users: CreateUserDto[]): Promise<User[]> {
    return this.userRepository.save(users);
  }

  async update(id: string, updateFields: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateFields);

    return this.userRepository.save(user);
  }

}
