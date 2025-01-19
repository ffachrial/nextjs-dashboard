import Form from "@/app/ui/houses/create-form";
import Breadcrumbs from "@/app/ui/general/breadcrumbs";
import { fetchStreets, fetchBlocks, fetchRT } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create House',
};

export default async function Page() {
  const streets = await fetchStreets();
  const blocks = await fetchBlocks();
  const rt = await fetchRT();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Houses', href: '/dashboard/houses'},
          {
            label: 'Create House',
            href: '/dashboard/houses/create',
            active: true
          },
        ]}
      />
      <Form streets={streets} blocks={blocks} rt={rt} />
    </main>
  );
}