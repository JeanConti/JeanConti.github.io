import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    // Convertir el array de tecnologías a JSON string
    const data = {
      ...createPortfolioDto,
      technologies: createPortfolioDto.technologies
        ? JSON.stringify(createPortfolioDto.technologies)
        : null,
    };

    return this.prisma.portfolio.create({
      data,
    });
  }

  async findAll(isPublished?: boolean, featured?: boolean) {
    const where: any = {};
    if (isPublished !== undefined) where.isPublished = isPublished;
    if (featured !== undefined) where.featured = featured;

    const items = await this.prisma.portfolio.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    // Parsear las tecnologías de JSON string a array
    return items.map((item) => ({
      ...item,
      technologies: item.technologies ? JSON.parse(item.technologies) : [],
    }));
  }

  async findOne(id: string) {
    const item = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return {
      ...item,
      technologies: item.technologies ? JSON.parse(item.technologies) : [],
    };
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    await this.findOne(id); // Verificar que existe

    const data = {
      ...updatePortfolioDto,
      technologies: updatePortfolioDto.technologies
        ? JSON.stringify(updatePortfolioDto.technologies)
        : undefined,
    };

    const updated = await this.prisma.portfolio.update({
      where: { id },
      data,
    });

    return {
      ...updated,
      technologies: updated.technologies ? JSON.parse(updated.technologies) : [],
    };
  }

  async remove(id: string) {
    await this.findOne(id); // Verificar que existe

    await this.prisma.portfolio.delete({
      where: { id },
    });

    return { message: 'Proyecto eliminado exitosamente' };
  }

  async togglePublished(id: string) {
    const item = await this.findOne(id);

    const updated = await this.prisma.portfolio.update({
      where: { id },
      data: { isPublished: !item.isPublished },
    });

    return {
      ...updated,
      technologies: updated.technologies ? JSON.parse(updated.technologies) : [],
    };
  }

  async toggleFeatured(id: string) {
    const item = await this.findOne(id);

    const updated = await this.prisma.portfolio.update({
      where: { id },
      data: { featured: !item.featured },
    });

    return {
      ...updated,
      technologies: updated.technologies ? JSON.parse(updated.technologies) : [],
    };
  }

  async updateOrder(id: string, order: number) {
    await this.findOne(id);

    const updated = await this.prisma.portfolio.update({
      where: { id },
      data: { order },
    });

    return {
      ...updated,
      technologies: updated.technologies ? JSON.parse(updated.technologies) : [],
    };
  }
}
