import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const { id } = req.body;

  const taskToDelete = await prisma.task.delete({
    where: {
      id: id,
    },
  });

  if (taskToDelete) {
    res.status(200).json(taskToDelete);
  }
}
