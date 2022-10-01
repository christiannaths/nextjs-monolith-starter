import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

prisma.$use(async (params, next) => {
  if (["findMany", "find"].includes(params.action)) {
    const result = await next(params);
    return JSON.parse(JSON.stringify(result));
  }
  return next(params);
});

export default prisma;
