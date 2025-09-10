const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Pinging database to keep it active...');
    const userCount = await prisma.user.count();
    console.log(`Database ping successful. Found ${userCount} users.`);
  } catch (e) {
    console.error('Failed to ping database:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
