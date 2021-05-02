import DBClient from "../../lib/prisma";

const prisma = DBClient.getInstance().prisma;

export default async function handle(req, res) {
  const { wid, name, eventDetails } = req.body;

  const workspace = await prisma.workspace.findUnique({
    where: {
      workspaceId: wid,
    },
  });

  const newTask = await prisma.event.create({
    data: {
      name: name,
      eventDetails: eventDetails,
      workspaceId: workspace.id,
    },
  });

  if (newTask) {
    res.status(200).json(newTask);
  }
}
