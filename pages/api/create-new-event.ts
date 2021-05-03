import DBClient from "../../lib/prisma";

const prisma = DBClient.getInstance().prisma;

// TODO: Implement Create New Event on the Frontend

export default async function handle(req, res) {
  const { wid, name, eventDetails } = req.body;

  const workspace = await prisma.workspace.findUnique({
    where: {
      workspaceId: wid,
    },
  });

  const newEvent = await prisma.event.create({
    data: {
      name: name,
      eventDetails: eventDetails,
      workspaceId: workspace.id,
    },
  });

  if (newEvent) {
    res.status(200).json(newEvent);
  }
}
