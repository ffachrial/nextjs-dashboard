import { PrismaClient as PrismaClientPostgres } from '@/prisma/postgres/generated/postgres';
import { PrismaClient as PrismaClientMongo } from '@/prisma/mongodb/generated/mongodb';

class PrismaClientManager {
  private static prismaPostgresInstance: PrismaClientPostgres;
  private static prismaMongoInstance: PrismaClientMongo;

  static getPrismaPostgres(): PrismaClientPostgres {
    if (!this.prismaPostgresInstance) {
      this.prismaPostgresInstance = new PrismaClientPostgres();
    }
    return this.prismaPostgresInstance;
  }

  static getPrismaMongo(): PrismaClientMongo {
    if (!this.prismaMongoInstance) {
      this.prismaMongoInstance = new PrismaClientMongo();
    }
    return this.prismaMongoInstance;
  }
}

export const prismaPostgres = PrismaClientManager.getPrismaPostgres();
export const prismaMongo = PrismaClientManager.getPrismaMongo();