import { server } from '@/config';

export const fetchCompanies = async ({ filters }: { filters: string[] }) => {
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
    return companies;
  } catch (error) {
    console.log(error);
  }
};
