import DBClient from "../../lib/prisma";

const prisma = DBClient.getInstance().prisma;

export default async function handle(req, res) {
  const { wid } = req.body;
  console.error(wid);

  const tasks = await prisma.workspace.findUnique({
    where: {
      workspaceId: wid,
    },
    select: {
      tasks: {
        select: {
          name: true,
          taskDesc: true,
          createdAt: true,
        },
      },
    },
  });
  if (tasks) {
    res.json(tasks);
  }
}
