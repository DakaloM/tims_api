import db from "../config/connection";
import { Prisma } from "@prisma/client";

const duplicateCommunication = async (
  type: Prisma.EnumCommunicationTypeFilter<"Communication">,
  userId: string,
) => {
  const duplicate = await db.communication.findFirst({
    where: {
      type: type,
      status: "OPEN",
      userId: userId
    },
  });
  if (duplicate) {
    return true;
  }

  return false;
};

export { duplicateCommunication };
