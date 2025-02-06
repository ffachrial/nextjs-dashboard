// lib/prisma.ts

import { PrismaClient as PrismaClientPostgres } from '@/prisma/postgres/generated/postgres';
import { PrismaClient as PrismaClientMongo } from '@/prisma/mongodb/generated/mongodb';
// import { PrismaClient as PrismaClientSupabase } from '@/prisma/supabase/generated/supabase';

declare global {
  var prismaPostgres: PrismaClientPostgres | undefined
  var prismaMongo: PrismaClientMongo | undefined
  // var prismaSupabase: PrismaClientSupabase | undefined
}

export const prismaPostgres = global.prismaPostgres || new PrismaClientPostgres(
  // { log: ['query', 'error', 'warn'] }  // Add logging for debugging
)

export const prismaMongo = global.prismaMongo || new PrismaClientMongo()

// export const prismaSupabase = global.prismaSupabase || new PrismaClientSupabase()

if (process.env.NODE_ENV !== 'production') {
  global.prismaPostgres = prismaPostgres
  global.prismaMongo = prismaMongo
  // global.prismaSupabase = prismaSupabase
}