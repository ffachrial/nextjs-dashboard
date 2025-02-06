import Form from "@/app/ui/ilp/create-visit-form";
import Breadcrumbs from "@/app/ui/general/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Visit',
};

export default async function Page(props: { params: Promise<{ id: string}>}) {
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'ILP', href: '/dashboard/ilp' },
          { label: 'Data Warga', href: `/dashboard/ilp/${id}`},
          { 
            label: 'Buat Visit', 
            href: `/dashboard/ilp/${id}/create-visit`,
            active: true,
          },
        ]} 
      />
      <Form id={id} />
    </main>
  );
}