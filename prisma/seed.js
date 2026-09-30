const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL is not set in environment.');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  // Seed Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eduna.com' },
    update: {
      passwordHash: adminPassword,
    },
    create: {
      email: 'admin@eduna.com',
      name: 'Eduna Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
      phone: '1234567890',
    },
  });

  // Seed Student
  const student = await prisma.user.upsert({
    where: { email: 'student@eduna.com' },
    update: {
      passwordHash: studentPassword,
    },
    create: {
      email: 'student@eduna.com',
      name: 'Eduna Student',
      passwordHash: studentPassword,
      role: 'STUDENT',
      phone: '0987654321',
    },
  });

  console.log('Seed completed successfully!');
  console.log('Admin user:', admin.email, '(password: admin123)');
  console.log('Student user:', student.email, '(password: student123)');

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
