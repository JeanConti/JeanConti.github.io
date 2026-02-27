import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsInt, IsUrl, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePortfolioDto {
  @ApiProperty({ example: 'Mi Proyecto Increíble' })
  @IsString()
  @IsNotEmpty({ message: 'El título es requerido' })
  title: string;

  @ApiProperty({ example: 'Descripción detallada del proyecto...' })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @ApiProperty({ example: 'Breve descripción', required: false })
  @IsString()
  @IsOptional()
  shortDesc?: string;

  @ApiProperty({ example: '/uploads/proyecto.jpg', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 'https://proyecto.com', required: false })
  @IsUrl({}, { message: 'URL del proyecto inválida' })
  @IsOptional()
  projectUrl?: string;

  @ApiProperty({ example: 'https://github.com/usuario/proyecto', required: false })
  @IsUrl({}, { message: 'URL de GitHub inválida' })
  @IsOptional()
  githubUrl?: string;

  @ApiProperty({ example: ['React', 'Node.js', 'MySQL'], required: false })
  @IsArray()
  @IsOptional()
  @Type(() => String)
  technologies?: string[];

  @ApiProperty({ example: 'Web Development', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: false, default: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  featured?: boolean;

  @ApiProperty({ example: 0, default: 0 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  order?: number;

  @ApiProperty({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isPublished?: boolean;
}
