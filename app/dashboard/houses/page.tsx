import Search from '@/app/ui/search';
import { CreateHouse } from '@/app/ui/houses/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Houses',
};

export default async function Page() {
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Houses</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search houses..." />
                <CreateHouse />
            </div>
        </div>
    );
}