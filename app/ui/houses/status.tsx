import clsx from "clsx";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function HouseStatus({ status }: { status: boolean}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === false,
          'bg-green-500 text-white': status === true,
        },
      )}
    >
      {status === false ? (
        <>
          Kosong
          <XMarkIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === true ? (
        <>
          Ditempati
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}