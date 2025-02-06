import { NextRequest, NextResponse } from "next/server";
import { prismaPostgres, prismaMongo } from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const [resident, medicalRecords] = await Promise.all([
        prismaPostgres.resident.findUnique({
          where: { id },
        }),
        prismaMongo.medicalRecord.findUnique({
          where: { residentId: id },
          include: {
            visitHistory: true
          }
        }),
    ]);
  
    // if (!resident) {
    //   return NextResponse.json(
    //     { error: "Resident not found" },
    //     { status: 404 }
    //   );
    // }

    // if (!medicalRecords) {
    //   return NextResponse.json(
    //     { error: "Medical records not found" },
    //     { status: 404 }
    //   );
    // }  

    // console.log(JSON.stringify(medicalRecords, null, 2));

    // Combine resident data with medical records
    const combinedData = {
      ...resident,
      medicalRecords: medicalRecords || null, // Attach filtered medical records
    };
  
    // console.log("Combined Data:", JSON.stringify(combinedData, null, 2));
  
    return NextResponse.json(combinedData);
  } catch (error) {
    console.error('Error fetching data warga:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data warga' },
      { status: 500 }
    );
  }
}