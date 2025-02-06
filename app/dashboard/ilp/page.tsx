import Search from '@/app/ui/search';
import Table from '@/app/ui/ilp/table';
import Pagination from '@/app/ui/general/pagination';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Suspense } from 'react';
import axios from 'axios';

export const metadata: Metadata = {
  title: 'Integrasi Layanan Primer',
};

async function fetchResidentCount(query: string): Promise<number> {
  try {
    const response = await axios.get('http:localhost:3000/api/ilp', {
        params: { 
          query,
          countOnly: true
        }
    });

    return response.data.total;
  } catch (error) {
    console.error('Error fetching resident count:', error);
    return 0;
  }
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const ITEMS_PER_PAGE = 10;

  // Fetch total count from API
  const totalCount = await fetchResidentCount(query);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2xl`}>Integrasi Layanan Primer</h1>
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Cari warga...' />
      </div>
      <Suspense key={query + currentPage} fallback={
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}