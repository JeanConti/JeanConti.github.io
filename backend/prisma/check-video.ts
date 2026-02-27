import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT id, title, videoUrl FROM portfolio`;
  console.log(JSON.stringify(result, null, 2));
}

main().finally(() => prisma.$disconnect());
