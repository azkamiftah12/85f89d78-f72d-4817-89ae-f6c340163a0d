/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'First Name should not be null or empty' })
  @IsString()
  firstName: string;

  @Column()
  @IsNotEmpty({ message: 'Last Name should not be null or empty' })
  @IsString()
  lastName: string;

  @Column()
  @IsNotEmpty({ message: 'Position should not be null or empty' })
  @IsString()
  position: string;

  @Column()
  @IsNotEmpty({ message: 'Phone should not be null or empty' })
  @IsString()
  phone: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email should not be null or empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}

