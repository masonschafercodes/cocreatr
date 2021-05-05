import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      isNewUser: true,
    },
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(200).json({ isNewUser: true });
  }
}
