import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seguridad
  app.use(helmet());

  // CORS
  const corsOrigins = process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || 
    ['http://localhost:5500', 'http://localhost:5501', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501'];
  
  console.log('Orígenes CORS permitidos:', corsOrigins);

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Prefijo global para API
  app.setGlobalPrefix('api');

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Portfolio Backend API')
    .setDescription('API para gestión de portfolio personal con panel de administración')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticación y autorización')
    .addTag('users', 'Gestión de usuarios')
    .addTag('portfolio', 'Gestión de proyectos del portfolio')
    .addTag('contact', 'Formulario de contacto')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
  🚀 Servidor iniciado exitosamente!
  
  📍 URL: http://localhost:${port}
  📚 Documentación API: http://localhost:${port}/api/docs
  🔐 Ambiente: ${process.env.NODE_ENV || 'development'}
  `);
}

bootstrap();
