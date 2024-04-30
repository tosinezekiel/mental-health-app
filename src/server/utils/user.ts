import { db } from "~/server/db";

export async function findUserByID(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
  });

  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
