import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async findAll(isRead?: boolean) {
    const where = isRead !== undefined ? { isRead } : {};

    return this.prisma.contact.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException('Contacto no encontrado');
    }

    return contact;
  }

  async markAsRead(id: string) {
    await this.findOne(id); // Verificar que existe

    return this.prisma.contact.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAsUnread(id: string) {
    await this.findOne(id); // Verificar que existe

    return this.prisma.contact.update({
      where: { id },
      data: { isRead: false },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verificar que existe

    await this.prisma.contact.delete({
      where: { id },
    });

    return { message: 'Contacto eliminado exitosamente' };
  }

  async getStats() {
    const total = await this.prisma.contact.count();
    const unread = await this.prisma.contact.count({
      where: { isRead: false },
    });
    const read = await this.prisma.contact.count({
      where: { isRead: true },
    });

    return {
      total,
      unread,
      read,
    };
  }
}
