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
  const { name, specialties } = filters;

  let filtered = [...companies];

  filtered = name
    ? filtered.filter(({ name: companyName }) =>
        companyName.toLowerCase().includes(name.toLowerCase()),
      )
    : filtered;

  filtered =
    specialties && specialties.length > 0
      ? filtered.filter(({ specialties: companySpecialties }) => {
          const intersections = companySpecialties.filter(
            (e) => specialties.indexOf(e) !== -1,
          );

          if (intersections.length > 0) {
            return true;
          }
          return false;
        })
      : filtered;

  return [...filtered];
};
