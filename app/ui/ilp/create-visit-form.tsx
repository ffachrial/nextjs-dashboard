'use client'

import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from '@/app/ui/button';
import { useState } from "react";
import { useAtom } from "jotai";
import { residentGenderAtom } from "@/app/lib/atoms";
import axios from "axios";

interface FormData {
  visitDate: string;
  residentId: string;
}

export default function Form({ id }: { id: string}) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ 
    visitDate: '',
    residentId: id,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [residentGender] = useAtom(residentGenderAtom);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/ilp/create',  {
        visitDate: formData.visitDate,
        residentId: formData.residentId,
        residentGender,
      });

      if (response.status === 200) {
        router.push('/dashboard/ilp');
      } else {
        setError('Failed to submit data. Please try again.');
      }

    } catch (err: any) {
      setError('An error occurred. Please try again later.');
      console.error("Error submitting data:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-black p-4 md:p-6">
        {/* Visit Date */}
        <div className="mb-4">
          <label htmlFor="visitdate" className="mb-2 block text-sm font-medium text-white">
            Tanggal Kunjungan
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input 
                type="date"
                id="visitDate"
                name="visitDate" 
                className="mt-2 block rounded-md border-gray-300 shadow-sm"
                value={formData.visitDate}
                onChange={handleChange} 
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Simpan Data'}
        </Button>
      </div>
    </form>
  );
}