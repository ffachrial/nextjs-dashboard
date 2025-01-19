import Form from '@/app/ui/houses/edit-form';
import Breadcrumbs from "@/app/ui/general/breadcrumbs";
import { fetchBlocks, fetchHouseById, fetchRT, fetchStreets } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Edit House',
};

export default async function Page(props: { params: Promise<{ id: string}>}) {
  const params = await props.params;
  const id = params.id;
  // const house = await fetchHouseById(id);
  // const streets = await fetchStreets();
  // const blocks = await fetchBlocks();
  // const rt = await fetchRT();
  const [house, streets, blocks, rt] = await Promise.all([
    fetchHouseById(id),
    fetchStreets(),
    fetchBlocks(),
    fetchRT(),
  ]);

  if (!house) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Houses', href: '/dashboard/houses' },
          {
            label: 'Edit House',
            href: `/dashboard/houses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form house={house} streets={streets} blocks={blocks} rt={rt} />
    </main>
  );
}