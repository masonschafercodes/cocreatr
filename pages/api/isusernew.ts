import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { email } = req.body;

  const users = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      isNewUser: true,
    },
  });
  res.send(users);
}
