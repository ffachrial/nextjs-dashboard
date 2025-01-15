// Import from invoices components. If success, try create for house
// components.
// Next step: Try to make Breadcrumbs general components and put in
// /app/ui/general/breadcrumbs for example
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create House',
};

export default async function Page() {
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
        </main>
    );
}