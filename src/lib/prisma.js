import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

let prismaInstance;

if (typeof window === 'undefined') {
  if (globalForPrisma.prisma && (!globalForPrisma.prisma.course || !globalForPrisma.prisma.chapter || !globalForPrisma.prisma.lessonProgress)) {
    delete globalForPrisma.prisma;
  }
  if (!globalForPrisma.prisma) {
    const connectionString = process.env.DATABASE_URL;
    if (connectionString) {
      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      globalForPrisma.prisma = new PrismaClient({ adapter });
    } else {
      // Fallback client for build step if DATABASE_URL is not set yet
      globalForPrisma.prisma = new PrismaClient();
    }
  }
  prismaInstance = globalForPrisma.prisma;
}

export const prisma = prismaInstance;
