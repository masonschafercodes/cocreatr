import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { wid } = req.body;
  if (req.method === "POST") {
    const workspace = await prisma.workspace.findUnique({
      where: {
        workspaceId: wid,
      },
    });

    const count = await prisma.task.groupBy({
      by: ["createdAt"],
      where: {
        workspaceId: workspace.id,
      },
      orderBy: {
        createdAt: "asc",
      },
      count: {
        name: true,
      },
    });

    await res.json(count);
  }
}
