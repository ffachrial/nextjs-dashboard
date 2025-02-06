import Breadcrumbs from "@/app/ui/general/breadcrumbs";
import Form from "@/app/ui/ilp/edit-visit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit Visit',
}

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
            label: 'Edit Visit', 
            href: `/dashboard/ilp/${id}/edit-visit`,
            active: true,
          },
        ]} 
      />
      <Form />
    </main>
  )
}