import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const { email } = req.body;
  if (email) {
    try {
      const workspaces = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          workspaces: {
            select: {
              title: true,
              description: true,
              active: true,
              id: true,
              workspaceId: true,
            },
          },
        },
      });
      if (workspaces) {
        res.json(workspaces);
      } else {
        res.json({ message: "no response" });
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(500).json({ message: "email not provided" });
  }
}
