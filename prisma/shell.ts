import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });

prisma.$on('query', (e) => {
  console.log(`Query: ${e.query}`);
  console.log(`Params: ${e.params}`);
  console.log(`Duration: ${e.duration}ms`);
});

async function main() {
  const events = await prisma.user.findMany();
  console.log(events);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
