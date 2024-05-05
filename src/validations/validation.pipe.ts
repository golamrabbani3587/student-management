import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessages = this.extractErrorMessages(errors);
      throw new BadRequestException(`Validation failed: ${errorMessages.join(', ')}`);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private extractErrorMessages(errors: ValidationError[]): string[] {
    return errors.map(error => this.flattenValidationErrors(error)).flat();
  }

  private flattenValidationErrors(error: ValidationError): string[] {
    if (error.constraints) {
      return Object.values(error.constraints);
    } else {
      return Object.values(error.children).map(this.flattenValidationErrors).flat();
    }
  }

  async catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof QueryFailedError && exception.message.includes('invalid input syntax for type integer')) {
      throw new BadRequestException('Invalid input: age must be a number');
    } else {
      throw exception;
    }
  }
}
