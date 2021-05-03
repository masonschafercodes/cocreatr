import DBClient from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../@types/User";

const prisma = DBClient.getInstance().prisma;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        await res.status(200).json(user);
      }
    } catch (error) {
      await res.status(401);
    }
  } else {
    await res.status(405);
  }
}
