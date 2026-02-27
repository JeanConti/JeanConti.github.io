import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ExpressService {
  private transporter: nodemailer.Transporter;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    if (this.configService.get('SMTP_HOST')) {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('SMTP_HOST'),
        port: parseInt(this.configService.get('SMTP_PORT')),
        secure: this.configService.get('SMTP_SECURE') === 'true',
        auth: {
          user: this.configService.get('SMTP_USER'),
          pass: this.configService.get('SMTP_PASSWORD'),
        },
      });
    }
  }

  async submitContact(createContactDto: CreateContactDto) {
    try {
      const contact = await this.prisma.contact.create({
        data: createContactDto,
      });

      if (this.transporter) {
        await this.sendContactEmail(createContactDto);
      }

      return {
        success: true,
        message: 'Message envoyé avec succès',
        id: contact.id,
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de l\'envoi du message');
    }
  }

  private async sendContactEmail(contact: CreateContactDto) {
    const mailOptions = {
      from: this.configService.get('EMAIL_FROM'),
      to: this.configService.get('SMTP_USER'),
      subject: `Nouveau contact: ${contact.subject || 'Sans sujet'}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        ${contact.phone ? `<p><strong>Téléphone:</strong> ${contact.phone}</p>` : ''}
        ${contact.subject ? `<p><strong>Sujet:</strong> ${contact.subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  }
}
