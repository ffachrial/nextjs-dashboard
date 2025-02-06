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
          medicalRecord: {
            select: {
              residentGender: true, // Fetch residentGender from MedicalRecord
            },
          },
          usiaDewasaDanLansia: {
            select: {
              pengukuran: {
                select: {
                  lingkarPerut: true,
                },
              },
            },
          },
        },
      });
    
      // Step 2: Group by medicalRecordId and count unique residents for each category
      const lingkarPerutCounts = {
        lingkarPerutPG90cm: new Set<string>(), // Residents with lingkarPerut > 90 cm and residentGender = 'Laki-laki'
        lingkarPerutWG80cm: new Set<string>(), // Residents with lingkarPerut > 80 cm and residentGender = 'Perempuan'
      };
    
      visits.forEach((visit) => {
        const lingkarPerut = visit.usiaDewasaDanLansia?.pengukuran?.lingkarPerut;
        const medicalRecordId = visit.medicalRecordId;
        const residentGender = visit.medicalRecord?.residentGender;
    
        if (lingkarPerut !== null && lingkarPerut !== undefined && residentGender) {
          if (residentGender === 'Laki-laki' && lingkarPerut > 90) {
            lingkarPerutCounts.lingkarPerutPG90cm.add(medicalRecordId);
          }
          if (residentGender === 'Perempuan' && lingkarPerut > 80) {
            lingkarPerutCounts.lingkarPerutWG80cm.add(medicalRecordId);
          }
        }
      });
    
      // Step 3: Convert sets to counts
      const finalCounts = {
        lingkarPerutPG90cm: lingkarPerutCounts.lingkarPerutPG90cm.size,
        lingkarPerutWG80cm: lingkarPerutCounts.lingkarPerutWG80cm.size,
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
