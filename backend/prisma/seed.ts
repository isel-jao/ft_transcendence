import { PrismaClient } from "@prisma/client";
import { Badge } from "@prisma/client";
const prisma = new PrismaClient();

const badges: Badge[] = [
  {
    id: 1,
    name: "BIOS",
    descreption: "BIOS",
  },
  {
    id: 2,
    name: "FREAX",
    descreption: "FREAX",
  },
  {
    id: 3,
    name: "PANDORA",
    descreption: "PANDORA",
  },
];

async function seedBadges() {
  try {
    for (let i = 0; i < badges.length; i++) {
      const badge = await prisma.badge.upsert({
        where: {
          id: badges[i].id,
        },
        update: badges[i],
        create: badges[i],
      });
      console.log(badge);
    }
  } catch (e) {
    console.log(e);
  }
}

async function main() {
  seedBadges();
}

main();
