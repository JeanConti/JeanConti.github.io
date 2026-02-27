import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpressService } from './express.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('public')
@Controller()
export class ExpressController {
  constructor(private readonly expressService: ExpressService) {}

  @Post('contact')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Envoyer le formulaire de contact' })
  @ApiResponse({ status: 200, description: 'Message envoyé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  submitContact(@Body() createContactDto: CreateContactDto) {
    return this.expressService.submitContact(createContactDto);
  }

  @Get('health')
  @ApiOperation({ summary: 'Vérifier l\'état du serveur' })
  @ApiResponse({ status: 200, description: 'Serveur fonctionnant correctement' })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
