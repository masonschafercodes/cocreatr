import DBClient from "../../lib/prisma";

const prisma = DBClient.getInstance().prisma;

export default async function handle(req, res) {
  const { wid } = req.body;

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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (tasks) {
    res.json(tasks);
  }
}
