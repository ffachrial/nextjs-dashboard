'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { StreetField, BlockField, RTField } from '@/app/lib/definitions';
import { createHouse, HouseState } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { 
    UserIcon, 
    HomeModernIcon, 
    KeyIcon, 
    UsersIcon,
    XMarkIcon,
    CheckIcon,
    MapIcon, 
} from '@heroicons/react/24/outline';

export default function Form({ streets, blocks, rt }: {streets: StreetField[], blocks: BlockField[], rt: RTField[]}) {
  const initialState: HouseState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createHouse, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* House Number */}
        <div className="mb-4">
          <label htmlFor="nomor" className="mb-2 block text-sm font-medium">
            Nomor Rumah
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nomor"
                name="nomor"
                type="text"
                placeholder="Masukkan No Rumah"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" 
              />
              <HomeModernIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* House Owner */}
        <div className="mb-4">
          <label htmlFor="owner" className="mb-2 block text-sm font-medium">
            Pemilik Rumah
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="owner"
                name="owner"
                type="text"
                placeholder="Masukkan Nama Pemilik"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" 
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* House Tenant */}
        <div className="mb-4">
          <label htmlFor="tenant" className="mb-2 block text-sm font-medium">
            Penyewa Rumah
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tenant"
                name="tenant"
                type="text"
                placeholder="Masukkan Nama Penyewa"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" 
              />
              <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Occupied */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Status Rumah
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="kosong"
                  name="status"
                  type="radio"
                  value="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="kosong"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Kosong <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="ditempati"
                  name="status"
                  type="radio"
                  value="true"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Ditempati <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Street */}
        <div className="mb-4">
          <label htmlFor="street" className="mb-2 block text-sm font-medium">
            Nama jalan
          </label>
          <div className="relative">
            <select
              id="street"
              name="streetId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="street-error"
            >
              <option value="" disabled>
                Pilih Jalan
              </option>
              {streets.map((street) => (
                <option key={street.id} value={street.id}>
                  {street.street_name}
                </option>
              ))}
            </select>
            <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Block */}
        <div className="mb-4">
          <label htmlFor="blocks" className="mb-2 block text-sm font-medium">
            Blok
          </label>
          <div className="relative">
            <select
              id="blocks"
              name="blocksId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="blocks-error"
            >
              <option value="" disabled>
                Pilih Blok
              </option>
              {blocks.map((block) => (
                <option key={block.id} value={block.id}>
                  {block.block_name}
                </option>
              ))}
            </select>
            <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* RT */}
        <div className="mb-4">
          <label htmlFor="rt" className="mb-2 block text-sm font-medium">
            RT
          </label>
          <div className="relative">
            <select
              id="rt"
              name="rtId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="rt-error"
            >
              <option value="" disabled>
                Pilih RT
              </option>
              {rt.map((rt) => (
                <option key={rt.id} value={rt.id}>
                  {rt.rt_number}
                </option>
              ))}
            </select>
            <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="rt-error" aria-live="polite" aria-atomic="true">
            {state.errors?.rtId && 
              state.errors.rtId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/houses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create House</Button>
      </div>
    </form>
  );
}