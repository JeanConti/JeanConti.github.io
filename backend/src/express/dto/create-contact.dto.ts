import { IsEmail, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @ApiProperty({ example: 'juan@ejemplo.com' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({ example: 'Consulta sobre servicios', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'El asunto no puede exceder 200 caracteres' })
  subject?: string;

  @ApiProperty({ example: 'Me gustaría obtener más información...' })
  @IsString()
  @IsNotEmpty({ message: 'El mensaje es requerido' })
  @MaxLength(2000, { message: 'El mensaje no puede exceder 2000 caracteres' })
  message: string;

  @ApiProperty({ example: '+34 600 123 456', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  phone?: string;
}
