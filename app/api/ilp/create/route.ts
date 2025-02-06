import { NextRequest, NextResponse } from "next/server";
import { prismaMongo } from "@/app/lib/prisma";

export async function POST( request: NextRequest) {
  try {
    const { residentId, visitDate, residentGender } = await request.json();
    const parsedVisitDate = new Date(visitDate);

    const utcVisitDate = new Date(Date.UTC(
      parsedVisitDate.getFullYear(), 
      parsedVisitDate.getMonth(), 
      parsedVisitDate.getDate()
    ));

    await prismaMongo.medicalRecord.upsert({
      where: { residentId: residentId },
      update: {
        visitHistory: {
          create: {
            visitDate: utcVisitDate
          }
        }
      },
      create: {
        residentId: residentId,
        residentGender: residentGender,
        visitHistory: {
          create: {
            visitDate: utcVisitDate
          }
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving visit date:', error)
    return NextResponse.json(
      { error: 'Failed to save visit date' },
      { status: 500 }
    );

  }
}