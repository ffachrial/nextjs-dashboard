'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { visitIdAtom } from "@/app/lib/atoms";
import { format } from 'date-fns'
import { Button } from "@/app/ui/button"
import axios from "axios";

import { labelDescription } from "@/app/lib/ilp-placeholder-data";

interface VisitHistory {
  id: string
  visitDate: string
  usiaDewasaDanLansia?: UsiaDewasaLansia
}

interface UsiaDewasaLansia {
  pengukuran?: Pengukuran
}

interface Pengukuran {
  beratBadan?: number
  tinggiBadan?: number
  IMT?: string
  lingkarPerut?: number
  lingkarLenganAtas?: number
  tekananDarah?: TekananDarah
  gulaDarah?: GulaDarah
  testHitungJariTangan?: TestMata
  testBerbisik?: TestTelinga 
}

interface TekananDarah {
  sistole?: number
  diastole?: number
  hasil?: string
}

interface GulaDarah {
  kadarGulaDarahSewaktu?: number
  hasil?: string
}

interface TestMata {
  mataKanan?: string
  mataKiri?: string
}

interface TestTelinga {
  telingaKanan?: string
  telingaKiri?: string
}

export default function Form() {
  const router = useRouter()
  const [visitHistory, setVisitHistory] = useState<VisitHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitId] = useAtom(visitIdAtom);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchVisitHistory = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3000/api/ilp/${visitId}/edit`, {})
        
        setVisitHistory(response.data)
        setError(null)
      } catch (error) {        
        setError('Failed to fetch data warga');
        console.error('Error fetching data warga:', error);
      } finally {
        setLoading(false)
      }
    }

    fetchVisitHistory()
  }, [visitId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const formValues = {
      visitId: visitId,
      visitDate: formData.get('visitDate'),
      beratBadan: formData.get('beratBadan') as string || null,
      tinggiBadan: formData.get('tinggiBadan') as string || null,
      lingkarPerut: formData.get('lingkarPerut') as string || null,
      lingkarLenganAtas: formData.get('lingkarLenganAtas') as string || null,
      sistole: formData.get('sistole') as string || null,
      diastole: formData.get('diastole') as string || null,
      IMT: formData.get('IMT') as string || null,
      tekananDarahResult: formData.get('tekananDarahResult') as string || null,
      kadarGulaDarahSewaktu: formData.get('kadarGulaDarahSewaktu') as string || null,
      kadarGulaDarahSewaktuResult: formData.get('kadarGulaDarahSewaktuResult') as string || null,
      mataKanan: formData.get('mataKanan') as string || null,
      mataKiri: formData.get('mataKiri') as string || null,
      telingaKanan: formData.get('telingaKanan') as string || null,
      telingaKiri: formData.get('telingaKiri') as string || null,
    }

    try {
      await axios.put(`http://localhost:3000/api/ilp/${visitId}/edit`, formValues);
      router.push('/dashboard/ilp');
      router.refresh()
    } catch (error) {
      setError('Failed to update visit data');
      console.error('Error updating visit data:', error);
    } finally {
      setSubmitting(false)
    }
  }

  // // Function to convert display value to API value
  // const convertToAPIValue = (value: string): number => {
  //   // Replace comma with dot first for consistency
  //   const normalizedValue = value.replace(',', '.');
  //   // Remove decimal point and convert to number
  //   return parseInt(normalizedValue.replace('.', ''));
  // };

  // Function to format number input (for display only)
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    // Replace comma with dot for consistent decimal display
    input.value = input.value.replace(',', '.');
  };

  if (loading) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {/* Langkah 1 */}
        <div className="rounded-md bg-orange-100 p-4 md:p-6">
          {/* Visit Date */}
          <div className="mb-4">
          <label htmlFor="visitdate" className="mb-2 block text-sm font-medium">
              Tanggal Kunjungan
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="date"
                  id="visitDate"
                  name="visitDate"
                  defaultValue={format(new Date(visitHistory!.visitDate), 'yyyy-MM-dd')}
                  className="mt-2 block rounded-md border-gray-300 shadow-sm"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
        {/* Langkah 2 */}
        <div className="rounded-md bg-yellow-300 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="beratBadan" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.beratBadan.description}
            </label>
            <input
              className="mt-2 size-10 pl-3 block w-full rounded-md border-gray-300"
              type="decimal"
              id="beratBadan"
              name="beratBadan"
              defaultValue={(visitHistory?.usiaDewasaDanLansia?.pengukuran?.beratBadan)}
              pattern="[0-9]*[.,]?[0-9]*"
              onChange={handleNumberInput}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tinggiBadan" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.tinggiBadan.description}
            </label>
            <input
              type="decimal"
              id="tinggiBadan"
              name="tinggiBadan"
              className="mt-2 size-10 pl-3 block w-full rounded-md border-gray-300"
              pattern="[0-9]*[.,]?[0-9]*"
              defaultValue={(visitHistory?.usiaDewasaDanLansia?.pengukuran?.tinggiBadan)}
              onChange={handleNumberInput}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lingkarPerut" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.lingkarPerut.description}
            </label>
            <input
              className="mt-2 size-10 pl-3 block w-full rounded-md border-gray-300"
              type="decimal"
              id="lingkarPerut"
              name="lingkarPerut"
              pattern="[0-9]*[.,]?[0-9]*"
              defaultValue={(visitHistory?.usiaDewasaDanLansia?.pengukuran?.lingkarPerut)}
              onChange={handleNumberInput}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lingkarLenganAtas" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.lingkarLenganAtas.description}
            </label>
            <input
              className="mt-2 size-10 pl-3 block w-full rounded-md border-gray-300"
              type="decimal"
              id="lingkarLenganAtas"
              name="lingkarLenganAtas"
              pattern="[0-9]*[.,]?[0-9]*"
              defaultValue={(visitHistory?.usiaDewasaDanLansia?.pengukuran?.lingkarLenganAtas)}
              onChange={handleNumberInput}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tekananDarah" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.tekananDarah.description}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                id="sistole"
                name="sistole"
                placeholder="Sistole"
                className="mt-2 block w-full rounded-md border-gray-300"
                defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.tekananDarah?.sistole}
              />
              <input
                type="number"
                id="diastole"
                name="diastole"
                placeholder="Diastole"
                className="mt-2 block w-full rounded-md border-gray-300"
                defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.tekananDarah?.diastole}
              />
            </div>
          </div>
        </div>
        {/* Langkah 3 */}
        <div className="rounded-md bg-yellow-100 p-4 md:p-6">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.tekananDarah.description}
            </label>
            <label htmlFor="tekananDarahResult" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.tekananDarah.result.result.description}
            </label>
            <select
              id="tekananDarahResult"
              name="tekananDarahResult"
              className="mt-2 block w-full rounded-md border-gray-300"
              defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.tekananDarah?.hasil}
            >
              <option value="">Pilih Hasil</option>
              <option value="Rendah">Rendah</option>
              <option value="Normal">Normal</option>
              <option value="Tinggi">Tinggi</option>
            </select> 
          </div>

          <div className="mb-4">
            <label htmlFor="IMT" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.indexMassaTubuh.description}
            </label>
            <select
              id="IMT"
              name="IMT"
              className="mt-2 block w-full rounded-md border-gray-300"
              defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.IMT}
            >
              <option value="">Pilih IMT</option>
              <option value="SK">Sangat Kurus (SK)</option>
              <option value="K">Kurus (K)</option>
              <option value="N">Normal (N)</option>
              <option value="G">Gemuk (G)</option>
              <option value="O">Obesitas (O)</option>
            </select>
          </div>
        </div>
        {/* Langkah 4 */}
        <div className="rounded-md bg-blue-300 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="kadarGulaDarahSewaktu" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.gulaDarah.result.kadarGulaDarahSewaktu.description}
            </label>
            <input
              type="number"
              id="kadarGulaDarahSewaktu"
              name="kadarGulaDarahSewaktu"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.gulaDarah?.kadarGulaDarahSewaktu}
            />
            <label htmlFor="kadarGulaDarahSewaktuResult" className="mt-4 mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.gulaDarah.result.result.description}
            </label>
            <select
              id="kadarGulaDarahSewaktuResult"
              name="kadarGulaDarahSewaktuResult"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.gulaDarah?.hasil}
            >
              <option value="">Select Result</option>
              <option value="Rendah">Rendah</option>
              <option value="Normal">Normal</option>
              <option value="Tinggi">Tinggi</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.testHitungJariTangan.description}
            </label>
            <label htmlFor="testHitungJariTangan" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.testHitungJariTangan.result.mataKanan.description}
            </label>
            <select
              id="mataKanan"
              name="mataKanan"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.testHitungJariTangan?.mataKanan}
            >
              <option value="">Select Result</option>
              <option value="Normal">Normal</option>
              <option value="Gangguan">Gangguan</option>
            </select>
            <label htmlFor="mataKiri" className="mt-4 mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.testHitungJariTangan.result.mataKiri.description}
            </label>
            <select
              id="mataKiri"
              name="mataKiri"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.testHitungJariTangan?.mataKiri}
            >
              <option value="">Select Result</option>
              <option value="Normal">Normal</option>
              <option value="Gangguan">Gangguan</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.testBerbisik.description}
            </label>
            <label htmlFor="telingaKanan" className="mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.testBerbisik.result.telingaKanan.description}
            </label>
            <select
              id="telingaKanan"
              name="telingaKanan"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.testBerbisik?.telingaKanan}
            >
              <option value="">Select Result</option>
              <option value="Normal">Normal</option>
              <option value="Gangguan">Gangguan</option>
            </select>
            <label htmlFor="telingaKiri" className="mt-4 mb-2 block text-sm font-medium">
              {labelDescription.usiaDewasaDanLansia.pengukuran.result.testBerbisik.result.telingaKiri.description}
            </label>
            <select
              id="telingaKiri"
              name="telingaKiri"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={visitHistory?.usiaDewasaDanLansia?.pengukuran?.testBerbisik?.telingaKiri}
            >
              <option value="">Select Result</option>
              <option value="Normal">Normal</option>
              <option value="Gangguan">Gangguan</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/ilp"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Simpan Data'}
        </Button>
      </div>
    </form>
  )
}