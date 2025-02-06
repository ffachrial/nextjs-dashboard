import { NextRequest, NextResponse } from "next/server";
import { prismaPostgres } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get URL search params
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const countOnly = searchParams.get('countOnly') === 'true';
    const offset = (page - 1) * limit;
    
    const residents = await prismaPostgres.resident.findMany({
      where: { residentStatus: true,
        OR: [
          { residentName: { contains: query, mode: 'insensitive' } },
          { houses: {
              OR: [
                {
                  AND: [
                    {
                      blocks: {
                        block_name: { contains: query.charAt(0), mode: 'insensitive' }
                      },
                    },
                    {
                      house_number: { contains: query.slice(1), mode: 'insensitive' },
                    },
                  ],
                },
                { house_number: { contains: query, mode: 'insensitive' } },
                { blocks: { block_name: { contains: query, mode: 'insensitive' } } },
                { streets: { street_name: { contains: query, mode: 'insensitive' } } },
              ],
            } 
          },
        ],
      },
      include: {
        houses: {
          include: {
            blocks: true,
            streets: true,
            rukun_tetangga: true,
          }
        }
      },
      orderBy: [
        { houses: { blocks: { block_name: 'asc' } } },
        { houses: { house_number: 'asc' } },
      ],
      skip: offset,
      take: limit,
    });

    // Get total count for pagination
    const total = await prismaPostgres.resident.count({
      where: {
        OR: [
          { residentName: { contains: query, mode: 'insensitive' } },
          { houses: {
              OR: [
                {
                  AND: [
                    {
                      blocks: {
                        block_name: { contains: query.charAt(0), mode: 'insensitive' }
                      },
                    },
                    {
                      house_number: { contains: query.slice(1), mode: 'insensitive' },
                    },
                  ],
                },
                { house_number: { contains: query, mode: 'insensitive' } },
                { blocks: { block_name: { contains: query, mode: 'insensitive' } } },
                { streets: { street_name: { contains: query, mode: 'insensitive' } } },
              ],
            } 
          },
        ],
      },
    });

    // If countOnly is true, return only the total
    if (countOnly) {
      return NextResponse.json({ total });
    }  

    return NextResponse.json({ 
        residents,
        total,
        page,
        totalPages: Math.ceil(total / limit), 
    });
  } catch (error) {
    console.error('Error fetching residents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch residents' },
      { status: 500 }
    );
  }
}