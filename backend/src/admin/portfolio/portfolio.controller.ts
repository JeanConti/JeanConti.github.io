import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('portfolio')
@Controller('admin/portfolio')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Crear nuevo proyecto' })
  @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente' })
  create(
    @Body() createPortfolioDto: CreatePortfolioDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createPortfolioDto.imageUrl = `/uploads/portfolio/${file.filename}`;
    }
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  @ApiQuery({ name: 'isPublished', required: false, type: Boolean })
  @ApiQuery({ name: 'featured', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Lista de proyectos' })
  findAll(@Query('isPublished') isPublished?: string, @Query('featured') featured?: string) {
    const isPublishedBool = isPublished === 'true' ? true : isPublished === 'false' ? false : undefined;
    const featuredBool = featured === 'true' ? true : featured === 'false' ? false : undefined;
    return this.portfolioService.findAll(isPublishedBool, featuredBool);
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Actualizar proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado' })
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updatePortfolioDto.imageUrl = `/uploads/portfolio/${file.filename}`;
    }
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado' })
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }

  @Patch(':id/toggle-published')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Publicar/despublicar proyecto' })
  @ApiResponse({ status: 200, description: 'Estado de publicación actualizado' })
  togglePublished(@Param('id') id: string) {
    return this.portfolioService.togglePublished(id);
  }

  @Patch(':id/toggle-featured')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Destacar/quitar destaque de proyecto' })
  @ApiResponse({ status: 200, description: 'Estado de destacado actualizado' })
  toggleFeatured(@Param('id') id: string) {
    return this.portfolioService.toggleFeatured(id);
  }

  @Patch(':id/order')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Actualizar orden del proyecto' })
  @ApiResponse({ status: 200, description: 'Orden actualizado' })
  updateOrder(@Param('id') id: string, @Body('order') order: number) {
    return this.portfolioService.updateOrder(id, order);
  }
}
