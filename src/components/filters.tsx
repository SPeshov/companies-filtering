import { fetchCompanies } from '@/lib/companies';
import { Company } from '@/types';
import Router, { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';

export const Filters = ({
  serverData,
  setSearchResults,
}: {
  serverData: Company[];
  setSearchResults: Dispatch<SetStateAction<Company[]>>;
}) => {
  const { query } = useRouter();
  const name = query.name as string;

  const updateQuery = (search: string) => {
    Router.replace({
      pathname: `/`,
      query: { name: encodeURI(search) },
    });
  };

  useEffect(() => {
    if (name) {
      getNewData();
    }

    if (!name || name.length < 3) {
      setSearchResults(serverData);
    }
  }, [name]);

  const getNewData = async () => {
    const data = await fetchCompanies({ filters: { name } });
    setSearchResults(data?.companies ? data.companies : []);
  };

  return (
    <div className="container mx-auto">
      <DebounceInput
        minLength={2}
        value={name}
        className="search"
        placeholder="Enter something here..."
        debounceTimeout={500}
        onChange={(e) => updateQuery(e.target.value)}
      />
    </div>
  );
};
