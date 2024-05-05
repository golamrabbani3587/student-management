import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { IsString, IsInt, IsDate, IsIn, IsNotEmpty, Min, Max, IsDateString } from 'class-validator';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @Column()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  course: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  hobby: string;

  @Column({ type: 'date' })
  @IsDateString()
  admissionDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}