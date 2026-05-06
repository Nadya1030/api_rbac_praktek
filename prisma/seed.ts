import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Permissions
  const permissionSlugs = [
    'user:create',
    'user:read',
    'user:update',
    'user:delete',
  ];

  for (const slug of permissionSlugs) {
    await prisma.permission.upsert({
      where: { slug },
      update: {},
      create: { slug },
    });
  }
  console.log('✅ Permissions seeded');

  // 2. Roles
  const roles = [
    { name: 'ADMIN', perms: permissionSlugs },
    { name: 'USER', perms: ['user:read'] },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: {
        name: r.name,
        permissions: {
          connect: r.perms.map((slug) => ({ slug })),
        },
      },
    });
  }
  console.log('✅ Roles seeded');

  // 3. Default users
  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  const userRole = await prisma.role.findUnique({ where: { name: 'USER' } });

  if (adminRole) {
    await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        roleId: adminRole.id,
      },
    });
    console.log('✅ Admin seeded       → admin@example.com / admin123');
  }

  if (userRole) {
    await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        password: await bcrypt.hash('user1234', 10),
        roleId: userRole.id,
      },
    });
    console.log('✅ User seeded        → user@example.com / user1234');
  }

  console.log('\n🎉 Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });