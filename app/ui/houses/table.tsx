import HouseStatus from "./status";
import { UpdateHouse } from "./buttons";
import { fetchFilteredHouses } from "@/app/lib/data";

export default async function HousesTable({ query, currentPage }: { query: string, currentPage: number }) {
  const houses = await fetchFilteredHouses(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {houses?.map((house) => (
              <div
                key={house.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <p className="font-bold text-xl">{house.block_name}{house.house_number}</p>
                      <p>{house.street_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{house.rt_number}</p>
                  </div>
                  <HouseStatus status={house.occupied} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {house.house_owner}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                  <UpdateHouse id={house.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Rumah
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    RT
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Pemilik
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {houses?.map((house) => (
                  <tr
                    key={house.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-xl">{house.block_name}{house.house_number}</p>
                        <p>{house.street_name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {house.rt_number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        {house.house_owner}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <HouseStatus status={house.occupied} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateHouse id={house.id} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}