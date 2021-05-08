import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const { id, wid } = req.body;

  const taskToDelete = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      isCompleted: true,
    },
  });

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
        orderBy: {
          isCompleted: "desc",
        },
      },
    },
  });

  if (taskToDelete) {
    res.status(200).json(tasks);
  }
}
