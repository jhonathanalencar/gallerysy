import { drizzle } from 'drizzle-orm/vercel-postgres';
import { VercelPool } from '@vercel/postgres';

import { image, user } from './schema.storage';

const users = [
  {
    userId: 'f988c031-df2c-4a0f-911b-9f0e96d4118a',
    name: 'Alice Ann',
    email: 'alice-ann@email.com',
    createdAt: new Date('2024-01-09T22:00:00.545Z'),
  },
];

const images = [
  {
    imageId: 1,
    name: 'raijuu-nara-violet-evergarden.jpg',
    imageUrl:
      'https://utfs.io/f/a970fe10-a621-47dc-ab8e-4db136adbd7b-uoz8dv.jpg',
    createdAt: new Date('2024-05-04T22:00:00.545Z'),
  },
  {
    imageId: 2,
    name: 'shakugan-no-shana.jpg',
    imageUrl:
      'https://utfs.io/f/6065bed9-0305-45f8-8cea-b0670202385f-g4e7r2.jpg',
    createdAt: new Date('2024-03-14T22:00:00.545Z'),
  },
  {
    imageId: 3,
    name: 'black-rock-shooter.jpg',
    imageUrl:
      'https://utfs.io/f/7765ad48-fbc7-4ab3-8842-bdc0c95091a8-5qhxq.jpg',
    createdAt: new Date('2024-05-01T22:00:00.545Z'),
  },
  {
    imageId: 4,
    name: 'kirishima-touka.jpg',
    imageUrl:
      'https://utfs.io/f/28770ec6-8c9e-48e1-8781-6acac167516a-7hutyu.jpg',
    createdAt: new Date('2024-02-11T22:00:00.545Z'),
  },
  {
    imageId: 5,
    name: 'Kimetsu-no-Yaiba-Zenitsu-Agatsuma-katana-yellow.jpg',
    imageUrl:
      'https://utfs.io/f/89309483-bef5-4477-a154-92defe792604-8l2nhm.jpg',
    createdAt: new Date('2024-02-25T22:00:00.545Z'),
  },
  {
    imageId: 6,
    name: 'anime-girl-with-kitsune-mask.png',
    imageUrl:
      'https://utfs.io/f/87c155ec-1680-49f7-8354-5647f97065d4-22soft.png',
    createdAt: new Date('2024-03-05T22:00:00.545Z'),
  },
  {
    imageId: 7,
    name: 'tomori-nao-charlotte.png',
    imageUrl:
      'https://utfs.io/f/93a65de5-3636-4c5f-bbf4-fb902e67334c-5oc4oy.png',
    createdAt: new Date('2024-01-09T22:00:00.545Z'),
  },
];

if (!('POSTGRES_URL' in process.env))
  throw new Error('POSTGRES_URL not found on .env');

const conn = new VercelPool({
  connectionString: process.env.POSTGRES_URL,
});
const db = drizzle(conn);

async function main() {
  await db.delete(image);
  await db.delete(user);

  const insertedUserIds: { insertedId: string }[] = await db
    .insert(user)
    .values(users)
    .returning({ insertedId: user.userId });

  const userId = String(insertedUserIds[0].insertedId);
  await db.insert(image).values(
    images.map((image) => {
      return {
        ...image,
        userId,
      };
    })
  );
}

main()
  .then(async () => {
    await conn.end();
    console.log('Your database has been seeded');
  })
  .catch(async (error) => {
    console.log(error);
    await conn.end();
    process.exit(1);
  });
