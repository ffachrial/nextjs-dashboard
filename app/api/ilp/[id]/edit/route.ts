import { NextRequest, NextResponse } from "next/server";
import { prismaMongo } from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const visitHistory = await prismaMongo.visitHistory.findUnique({
      where: { id }
    })
    
    return NextResponse.json(visitHistory)
  } catch (error) {
    console.error('Error fetching visit history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visit history' },
      { status: 500 }
    );
  }
}

export async function PUT( request: NextRequest ) {
  try {
    const visitHistory = await request.json()
    console.log(visitHistory)
    const parsedVisitDate = new Date(visitHistory.visitDate)
    const utcVisitDate = new Date(Date.UTC(
      parsedVisitDate.getFullYear(),
      parsedVisitDate.getMonth(),
      parsedVisitDate.getDate()
    ))
    
    const result = await prismaMongo.visitHistory.update({
      where: {
        id: visitHistory.visitId 
      },
      data: {
        visitDate: utcVisitDate,
        usiaDewasaDanLansia: {
            pengukuran: {
              beratBadan: parseFloat(visitHistory.beratBadan),
              tinggiBadan: parseFloat(visitHistory.tinggiBadan),
              IMT: visitHistory.IMT,
              lingkarPerut: parseFloat(visitHistory.lingkarPerut),
              lingkarLenganAtas: parseFloat(visitHistory.lingkarLenganAtas),
              tekananDarah: {
                sistole: parseInt(visitHistory.sistole),
                diastole: parseInt(visitHistory.diastole),
                hasil: visitHistory.tekananDarahResult,
              },
              gulaDarah: {
                kadarGulaDarahSewaktu: parseInt(visitHistory.kadarGulaDarahSewaktu),
                hasil: visitHistory.kadarGulaDarahSewaktuResult,
              },
              testHitungJariTangan: {
                mataKanan: visitHistory.mataKanan,
                mataKiri: visitHistory.mataKiri,
              },
              testBerbisik: {
                telingaKanan: visitHistory.telingaKanan,
                telingaKiri: visitHistory.telingaKiri,
              }
            }
        }
      }
    })
    // console.log((await result).usiaDewasaDanLansia?.pengukuran?.beratBadan)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json(
      { error: 'Failed to save data'},
      { status: 500 }
    )
  }
}