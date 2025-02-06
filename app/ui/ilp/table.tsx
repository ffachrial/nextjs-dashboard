'use client'

import { useState, useEffect } from "react";
import { MeasureResident } from "./buttons";
import { formatDOBtoAge } from "@/app/lib/utils";
import axios from "axios";

interface Resident {
  id: string
  residentName: string
  residentDob: string
  gender: string
  houses: House
}

interface House {
  house_number: string
  houseOwner: string
  blocks: {
    block_name: string
  }
  streets: {
    street_name: string
  }
  rukun_tetangga: {
    rt_number: string
  }
}

interface TableProps {
  query: string
  currentPage: number
}

export default function ILPTable({
  query,
  currentPage
}: TableProps) {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/ilp', {
          params: { 
            query, 
            page: currentPage, 
            limit: 10
          }
        })
        setResidents(response.data.residents);
        setError(null);
      } catch (err) {
        setError('Failed to fetch residents data');
        console.error('Error fetching residents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [query, currentPage]);

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
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        <div className="md:hidden">
          {
            residents?.length === 0 ? (
              <div className="text-center py-4">No residents found</div>
            ) : (
            residents.map((resident) => (
            <div
              key={resident.id}
              className="mb-2 w-full rounded-md bg-white p-4"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <p className="font-bold text-xl">{resident.houses.blocks.block_name}{resident.houses.house_number}</p>
                    <p>{resident.houses.streets.street_name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{resident.houses.rukun_tetangga.rt_number}</p>
                </div>
                Langkah12345
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p className="text-xl font-medium">
                    {resident.residentName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDOBtoAge(new Date(resident.residentDob).toLocaleDateString())}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <MeasureResident id={resident.id} />
                </div>
              </div>
            </div>
            ))
          )}
        </div>
        </div>
      </div>
    </div>
  );
}