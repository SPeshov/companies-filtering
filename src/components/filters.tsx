import { fetchCompanies } from '@/lib/companies';
import { updateQuery } from '@/lib/router';
import { Company } from '@/types';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';

export const Filters = ({
  serverData,
  setSearchResults,
  specialties,
}: {
  serverData: Company[];
  specialties: string[];
  setSearchResults: Dispatch<SetStateAction<Company[]>>;
}) => {
  const { query } = useRouter();
  const name = query.name as string;
  const specialtiesParams = (query.specialties as string[]) || [];

  useEffect(() => {
    if (name || specialtiesParams?.length > 0) {
      getNewData();
    }

    if ((!name || name.length < 3) && specialtiesParams?.length === 0) {
      setSearchResults(serverData);
    }
  }, [name, specialtiesParams]);

  const getNewData = async () => {
    const data = await fetchCompanies({
      filters: { name, specialties: specialtiesParams },
    });
    setSearchResults(data?.companies ? data.companies : []);
  };

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedList: string[] = [...specialtiesParams];
    if (event.target.checked) {
      updatedList = [
        ...(Array.isArray(specialtiesParams)
          ? specialtiesParams
          : [specialtiesParams]),
        event.target.value,
      ];
    } else {
      if (Array.isArray(specialtiesParams)) {
        updatedList.splice(specialtiesParams.indexOf(event.target.value), 1);
      } else {
        updatedList = [];
      }
    }

    updateQuery({ name, specialties: updatedList });
  };

  return (
    <div className="container mx-auto ">
      <DebounceInput
        className="mt-5 mb-5 w-100 "
        minLength={2}
        value={name}
        placeholder="Enter something here..."
        debounceTimeout={500}
        onChange={(e) =>
          updateQuery({ name: e.target.value, specialties: specialtiesParams })
        }
      />

      <div className="grid grid-cols-5 gap-2">
        {specialties.map((spec, index) => (
          <div key={index} className="flex items-center mr-4">
            <input
              onChange={(e) => handleCheck(e)}
              id={`inline-checkbox-${index}`}
              type="checkbox"
              checked={specialtiesParams.includes(spec)}
              value={spec}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={`inline-checkbox-${index}`}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {spec}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
