import Breadcrumbs from "@/app/ui/general/breadcrumbs";
import DataWarga from '@/app/ui/ilp/data-form';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Data Kesehatan Warga',
};
export default async function Page(props: { params: Promise<{ id: string}>}) {
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'ILP', href: '/dashboard/ilp' },
          { 
            label: 'Data Warga', 
            href: `/dashboard/ilp/${id}`,
            active: true,
          },
        ]} 
      />
      <DataWarga id={id} />
    </main>
  );
}