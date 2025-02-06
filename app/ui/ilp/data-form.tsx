'use client'

import { PlusIcon } from "@heroicons/react/24/solid";
import { formatDOBtoAge } from "@/app/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { visitIdAtom, residentGenderAtom } from "@/app/lib/atoms";
import axios from "axios";

interface Resident {
  id: string
  residentName: string
  residentDob: string
  gender: string
  medicalRecords?: MedicalRecord
}

interface MedicalRecord {
  id: string
  visitHistory?: VisitHistory[]
}

interface VisitHistory {
  id: string
  visitDate: string
  usiaDewasaDanLansia: UsiaDewasaLansia | null
}

interface UsiaDewasaLansia {
  pengukuran: Pengukuran | null
}

interface Pengukuran {
  beratBadan?: number
  tinggiBadan?: number
}

export default function DataWarga({ id }: { id: string }) {
  const [resident, setResident] = useState<Resident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const setVisitId = useSetAtom(visitIdAtom);
  const setResidentGender = useSetAtom(residentGenderAtom);
  
  useEffect(() => {
    const fetchDataResident = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/ilp/${id}`, {})

        setResident(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data warga');
        console.error('Error fetching data warga:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataResident();
  }, [id]);

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

  if (!resident) {
    return (
      <div className="mt-6 text-center text-red-500">
        Resident not found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl bg-slate-800 p-4 md:p-6 w-full">
        {/* Nama */}
        <div className="mb-4">
          <label htmlFor="nama" className="mb-2 block text-2xl font-medium text-white">
            {resident?.residentName}
          </label>
        </div>
        {/* DOB */}
        <div className="mb-4">
          <label htmlFor="nama" className="mb-2 block text-sm font-medium text-white">
            {formatDOBtoAge(resident?.residentDob)}
          </label>
        </div>
        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="nama" className="mb-2 block text-sm font-medium text-white">
            {resident?.gender}
          </label>
        </div>
      </div>
      <div className="bg-slate-400 rounded-xl p-4 w-full flex items-center justify-center">
        <div className="space-y-2" onClick={() => setResidentGender(resident.gender)}>
          <Link href={`/dashboard/ilp/${id}/create-visit`}>
            <div className="p-2 rounded flex justify-center items-center hover:bg-gray-100">
                <PlusIcon className="w-6" />
            </div>
          </Link>
        </div>
      </div>
      {resident?.medicalRecords?.visitHistory
        ?.sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())
        .map((visit) => (
      <div
        key={visit.id} 
        className="bg-slate-800 rounded-xl p-4 w-full md:p-6"
        onClick={() => setVisitId(visit.id)}
      >
        <Link href={`/dashboard/ilp/${id}/edit-visit`}>
            <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-center gap-3">
                    <div className="font-bold text-white">
                      {new Date(visit.visitDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long", // "long" gives you the full month name
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="font-bold text-white">
                        {visit.usiaDewasaDanLansia?.pengukuran?.beratBadan} Kg
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm ml-6">Berat Badan</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      <div className="font-bold text-white">
                        {visit.usiaDewasaDanLansia?.pengukuran?.tinggiBadan} Cm
                      </div>
                  </div>
                  <div className="text-gray-400 text-sm ml-6">Tinggi Badan</div>
                </div>
            </div>
        </Link>
      </div>
      ))}
    </div>
  );
}