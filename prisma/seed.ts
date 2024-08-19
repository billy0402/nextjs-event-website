import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const userData = [
    {
      email: 'admin@example.com',
      password: await hash('password', 10),
      name: 'Admin',
      role: Role.ADMIN,
    },
    {
      email: 'user@example.com',
      password: await hash('password', 10),
      name: 'User',
      role: Role.USER,
    },
  ];
  const createdUsers = await prisma.user.createMany({ data: userData });
  const users = await prisma.user.findMany();
  console.log(`Created ${createdUsers.count} users`);

  const eventData = [
    {
      title: 'Tech Conference 2024',
      description: 'A conference for tech enthusiasts and professionals.',
      startDateTime: new Date('2024-09-15T10:00:00Z'),
      endDateTime: new Date('2024-09-16T18:00:00Z'),
      location: 'Convention Center, Cityville',
    },
    {
      title: 'Art Exhibition',
      description: 'An exhibition showcasing modern art.',
      startDateTime: new Date('2024-10-01T18:00:00Z'),
      endDateTime: new Date('2024-10-03T22:00:00Z'),
      location: 'Gallery Space, Art Town',
    },
  ];
  const createdEvents = await prisma.event.createMany({ data: eventData });
  const events = await prisma.event.findMany();
  console.log(`Created ${createdEvents.count} events`);

  const createdReservations = await prisma.reservation.createMany({
    data: [
      {
        userId: users[0].id,
        eventId: events[0].id,
      },
      {
        userId: users[0].id,
        eventId: events[1].id,
      },
      {
        userId: users[1].id,
        eventId: events[1].id,
      },
    ],
  });
  console.log(`Created ${createdReservations.count} reservations`);

  const newsData = [
    {
      title: 'Tech Conference Registration Open',
      content:
        'The registration for Tech Conference 2024 is now open. Don’t miss out!',
      publishedAt: new Date(),
    },
    {
      title: 'Art Exhibition Tickets Available',
      content: 'Tickets for the Art Exhibition are now available for purchase.',
      publishedAt: new Date(),
    },
  ];
  const createdNews = await prisma.news.createMany({ data: newsData });
  console.log(`Created ${createdNews.count} news`);
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
