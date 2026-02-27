import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('contact')
@Controller('admin/contacts')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Obtener todos los contactos' })
  @ApiQuery({ name: 'isRead', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Lista de contactos' })
  findAll(@Query('isRead') isRead?: string) {
    const isReadBool = isRead === 'true' ? true : isRead === 'false' ? false : undefined;
    return this.contactService.findAll(isReadBool);
  }

  @Get('stats')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Obtener estadísticas de contactos' })
  @ApiResponse({ status: 200, description: 'Estadísticas de contactos' })
  getStats() {
    return this.contactService.getStats();
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Obtener un contacto por ID' })
  @ApiResponse({ status: 200, description: 'Contacto encontrado' })
  @ApiResponse({ status: 404, description: 'Contacto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id/read')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Marcar contacto como leído' })
  @ApiResponse({ status: 200, description: 'Contacto marcado como leído' })
  markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Patch(':id/unread')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Marcar contacto como no leído' })
  @ApiResponse({ status: 200, description: 'Contacto marcado como no leído' })
  markAsUnread(@Param('id') id: string) {
    return this.contactService.markAsUnread(id);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar contacto' })
  @ApiResponse({ status: 200, description: 'Contacto eliminado' })
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
