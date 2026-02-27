import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear usuario administrador
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrador',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Usuario administrador creado:', admin.email);

  // Crear proyectos de portfolio de ejemplo
  const portfolioItems = [
    {
      title: 'Proyecto Web Moderno',
      description: 'Aplicación web completa desarrollada con las últimas tecnologías. Incluye autenticación, panel de administración y API REST.',
      shortDesc: 'Aplicación web full-stack con React y Node.js',
      imageUrl: '/images/proyecto1.jpg',
      projectUrl: 'https://ejemplo.com/proyecto1',
      githubUrl: 'https://github.com/usuario/proyecto1',
      technologies: JSON.stringify(['React', 'Node.js', 'MySQL', 'TypeScript']),
      category: 'Web Development',
      featured: true,
      order: 1,
      isPublished: true,
    },
    {
      title: 'App Móvil Innovadora',
      description: 'Aplicación móvil multiplataforma con diseño moderno y funcionalidades avanzadas.',
      shortDesc: 'App móvil con React Native',
      imageUrl: '/images/proyecto2.jpg',
      projectUrl: 'https://ejemplo.com/proyecto2',
      githubUrl: 'https://github.com/usuario/proyecto2',
      technologies: JSON.stringify(['React Native', 'Firebase', 'Redux']),
      category: 'Mobile Development',
      featured: true,
      order: 2,
      isPublished: true,
    },
    {
      title: 'Sistema de Gestión',
      description: 'Sistema completo de gestión empresarial con múltiples módulos y reportes avanzados.',
      shortDesc: 'ERP personalizado con NestJS',
      imageUrl: '/images/proyecto3.jpg',
      projectUrl: 'https://ejemplo.com/proyecto3',
      technologies: JSON.stringify(['NestJS', 'Angular', 'PostgreSQL', 'Docker']),
      category: 'Enterprise',
      featured: false,
      order: 3,
      isPublished: true,
    },
  ];

  for (const item of portfolioItems) {
    await prisma.portfolio.upsert({
      where: { id: item.title }, // Usamos title como identificador único temporal
      update: {},
      create: item,
    });
  }

  console.log('✅ Proyectos de portfolio creados');

  // Crear algunos contactos de ejemplo
  const contacts = [
    {
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      subject: 'Consulta sobre servicios',
      message: 'Me gustaría saber más sobre sus servicios de desarrollo web.',
      phone: '+34 600 123 456',
      isRead: false,
    },
    {
      name: 'María García',
      email: 'maria@ejemplo.com',
      subject: 'Propuesta de colaboración',
      message: 'Tengo un proyecto interesante y me gustaría colaborar contigo.',
      phone: '+34 600 789 012',
      isRead: true,
    },
  ];

  for (const contact of contacts) {
    await prisma.contact.create({
      data: contact,
    });
  }

  console.log('✅ Contactos de ejemplo creados');
  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
