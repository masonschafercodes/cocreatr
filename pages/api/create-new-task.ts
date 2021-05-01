import DBClient from "../../lib/prisma";

const prisma = DBClient.getInstance().prisma;

export default async function handle(req, res) {
  const { wid, name, taskDesc } = req.body;

  const workspace = await prisma.workspace.findUnique({
    where: {
      workspaceId: wid["wid"],
    },
  });

  const newTask = await prisma.task.create({
    data: {
      name: name,
      taskDesc: taskDesc,
      workspaceId: workspace.id,
    },
  });

  if (newTask) {
    res.status(200).json(newTask);
  }
}
