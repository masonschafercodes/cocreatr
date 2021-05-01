import DBClient from "../../lib/prisma";

const prisma = DBClient.getInstance().prisma;

export default async function handle(req, res) {
  const { email } = req.body;

  const workspaces = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      workspaces: {
        select: {
          title: true,
          description: true,
          active: true,
          id: true,
          workspaceId: true,
        },
      },
    },
  });
  if (workspaces) {
    res.json(workspaces);
  }
}
