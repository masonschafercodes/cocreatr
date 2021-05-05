import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const { wid, name, taskDesc, email } = req.body;
  console.log(req.body);

  const workspace = await prisma.workspace.findUnique({
    where: {
      workspaceId: wid,
    },
  });

  const creator = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const newTask = await prisma.task.create({
    data: {
      name: name,
      taskDesc: taskDesc,
      workspaceId: workspace.id,
      creatorId: creator.id,
    },
  });

  if (newTask) {
    res.status(200).json(newTask);
  }
}
