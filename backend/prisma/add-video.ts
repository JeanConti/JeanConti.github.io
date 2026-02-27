import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Buscando proyecto "LE PAIN DE VIE"...');

  // Usar SQL directo para evitar problemas con Prisma client
  const result = await prisma.$queryRaw`SELECT * FROM portfolio`;
  console.log('Proyectos en DB:', JSON.stringify(result, null, 2));
  
  // @ts-ignore
  const projects = result as any[];
  let project = projects.find((p: any) => p.title?.toLowerCase().includes('pain') || p.title?.toLowerCase().includes('vie'));

  if (project) {
    console.log('✅ Proyecto encontrado:', project.title);
    // Update using raw SQL
    await prisma.$executeRaw`UPDATE portfolio SET videoUrl = '/uploads/portfolio/Video-SiteWebDidier.mp4' WHERE id = ${project.id}`;
    console.log('✅ Video URL añadida');
  } else {
    console.log('📝 Creando proyecto "LE PAIN DE VIE"...');
    // Insert using raw SQL - using backticks for column names
    await prisma.$executeRawUnsafe(`
      INSERT INTO portfolio (id, title, description, shortDesc, imageUrl, videoUrl, projectUrl, technologies, category, featured, \`order\`, isPublished, createdAt, updatedAt)
      VALUES (UUID(), 'LE PAIN DE VIE', 'Site web pour une boulangerie artisanale', 'Site web boulangerie artisanale', '/uploads/portfolio/le-pain-de-vie.jpg', '/uploads/portfolio/Video-SiteWebDidier.mp4', 'https://boulangerie-didier.fr', '["HTML", "CSS", "JavaScript", "PHP"]', 'Site Web', true, 1, true, NOW(), NOW())
    `);
    console.log('✅ Proyecto creado con video');
  }

  console.log('🎉 Done!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
