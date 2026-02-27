import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '15m',
    };
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId, type: 'refresh' };
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d';

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    // Guardar el refresh token en la base de datos
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // 7 días

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt: expirationDate,
      },
    });

    return token;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
      const payload = this.jwtService.verify(refreshToken, { secret });

      // Verificar que el refresh token existe en la base de datos
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Refresh token inválido o expirado');
      }

      if (!storedToken.user.isActive) {
        throw new UnauthorizedException('Usuario inactivo');
      }

      const newPayload = {
        sub: storedToken.user.id,
        email: storedToken.user.email,
        role: storedToken.user.role,
      };

      const accessToken = this.jwtService.sign(newPayload);

      return {
        accessToken,
        expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '15m',
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      // Eliminar el refresh token específico
      await this.prisma.refreshToken.deleteMany({
        where: {
          token: refreshToken,
          userId,
        },
      });
    } else {
      // Eliminar todos los refresh tokens del usuario
      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      });
    }

    return { message: 'Sesión cerrada exitosamente' };
  }

  async cleanExpiredTokens() {
    await this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
