import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'usuario@ejemplo.com' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({ example: 'Password123!', minLength: 6 })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({ example: 'ADMIN', enum: ['ADMIN', 'SUPER_ADMIN'], default: 'ADMIN' })
  @IsEnum(['ADMIN', 'SUPER_ADMIN'], { message: 'Rol inválido' })
  @IsOptional()
  role?: 'ADMIN' | 'SUPER_ADMIN';

  @ApiProperty({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
