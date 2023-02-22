// Database
import { prisma } from "@/shared/infra/database";

export async function teardown() {
  await prisma.user.deleteMany();
}
