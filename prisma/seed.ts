import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UserType } from '~/types/userTypes';

const prisma = new PrismaClient();

async function main() {
  const users: UserType[] = [
    { email: 'alice@example.com', firstName: 'Alice', lastName: 'Billy', password: 'password123' },
    { email: 'bob@example.com', firstName: 'Bob', lastName: 'Alex', password: 'password123' },
    { email: 'johndoe@example.com', firstName: 'john', lastName: 'doe', password: 'password123', role: 'ADMIN' },
  ];

  for (const user of users) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: hashedPassword,
        role: user?.role
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
