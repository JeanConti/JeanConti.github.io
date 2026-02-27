import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token para obtener un nuevo access token',
  })
  @IsString()
  @IsNotEmpty({ message: 'El refresh token es requerido' })
  refreshToken: string;
}
