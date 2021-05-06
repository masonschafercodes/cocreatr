import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const { id } = req.body;

  const taskToDelete = await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      isCompleted: true,
    },
  });

  if (taskToDelete) {
    res.status(200).json(taskToDelete);
  }
}
