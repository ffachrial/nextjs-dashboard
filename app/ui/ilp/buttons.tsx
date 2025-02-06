import { BeakerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function MeasureResident({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/ilp/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <BeakerIcon className="w-5" />
    </Link>
  );
}