import prisma from "../../lib/prisma";

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
          id: true,
          creator: true,
          isCompleted: true,
        },
      },
    },
  });
  if (tasks) {
    res.json(tasks);
  }
}
