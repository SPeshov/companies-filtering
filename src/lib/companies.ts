import { server } from '@/config';
import { getData } from '@/data';
import { Company, Filters, ResponseData } from '@/types';

export const fetchCompanies = async ({ filters }: { filters: Filters }) => {
  try {
    const response = await fetch(`${server}/api/companies`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({ filters }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const companies = await response.json();
    return companies as ResponseData['data'];
  } catch (error) {
    console.log(error);
  }
};

export const getAvailableSpecialties = async () => {
  const companies = await getData();

  const specialties = new Set<string>();

  const allSpecialties = companies.flatMap((company) => company.specialties);

  allSpecialties.forEach((spec) => {
    specialties.add(spec);
  });

  return [...specialties];
};

export const filterCompanies = ({
  filters,
  companies,
}: {
  filters: Filters;
  companies: Company[];
}) => {
  const { name } = filters;

  const filterByName = companies.filter(({ name: companyName }) =>
    name ? companyName.toLowerCase().includes(name.toLowerCase()) : true,
  );

  return filterByName;
};
