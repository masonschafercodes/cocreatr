import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, pictureLink, worspaceName } = req.body;
      const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          isNewUser: false,
          pictureLink: pictureLink,
        },
      });

      // This adds a default workspace for a new user
      const userWorkspace = await prisma.workspace.create({
        data: {
          creatorId: user.id,
          active: true,
          title: worspaceName,
          description: "This is a your first workspace, you get it for free!",
        },
      });
      await res.status(200).json({ done: true });
    } catch (error) {
      await res.status(304).json({ error: error });
    }
  } else {
    res.send(405);
  }
}
