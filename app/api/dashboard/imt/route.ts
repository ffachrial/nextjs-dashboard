import { NextRequest, NextResponse } from "next/server"
import { prismaMongo } from "@/app/lib/prisma"

export async function GET() {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    // Step 1: Fetch all visits in the current month with the necessary fields
    const visits = await prismaMongo.visitHistory.findMany({
      where: {
        visitDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      select: {
        medicalRecordId: true,
        usiaDewasaDanLansia: {
          select: {
            pengukuran: {
              select: {
                IMT: true,
              },
            },
          },
        },
      },
    });
  
    // Step 2: Group by medicalRecordId and count unique IMT values
    const imtCounts = {
      SK: new Set<string>(),
      K: new Set<string>(),
      N: new Set<string>(),
      G: new Set<string>(),
      O: new Set<string>(),
    };
  
    visits.forEach((visit) => {
      const imt = visit.usiaDewasaDanLansia?.pengukuran?.IMT;
      const medicalRecordId = visit.medicalRecordId;
  
      if (imt && imtCounts.hasOwnProperty(imt)) {
        imtCounts[imt as keyof typeof imtCounts].add(medicalRecordId);
      }
    });
  
    // Step 3: Convert sets to counts
    const finalCounts = {
      SK: imtCounts.SK.size,
      K: imtCounts.K.size,
      N: imtCounts.N.size,
      G: imtCounts.G.size,
      O: imtCounts.O.size,
    };
  
    return NextResponse.json(finalCounts)
  } catch (error) {
    console.error('Error fetching dashboard ILP:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard ILP' },
      { status: 500 },
    )
  }
}
