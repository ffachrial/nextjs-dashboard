import { NextResponse } from "next/server"
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
                tekananDarah: {
                  select: {
                    hasil: true,
                  }
                }
              },
            },
          },
        },
      },
    });

    // Step 2: Group by medicalRecordId and count unique Tekanan Darah values
    const tdCounts = {
      Rendah: new Set<string>(),
      Normal: new Set<string>(),
      Tinggi: new Set<string>(),
    };
  
    visits.forEach((visit) => {
      const td = visit.usiaDewasaDanLansia?.pengukuran?.tekananDarah?.hasil;
      const medicalRecordId = visit.medicalRecordId;
  
      if (td && tdCounts.hasOwnProperty(td)) {
        tdCounts[td as keyof typeof tdCounts].add(medicalRecordId);
      }
    });
  
    // Step 3: Convert sets to counts
    const finalCounts = {
      rendah: tdCounts.Rendah.size,
      normal: tdCounts.Normal.size,
      tinggi: tdCounts.Tinggi.size,
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
