import fsPromises from 'fs/promises';
import path from 'path';

export const getData = async () => {
  const filePath = path.join(process.cwd(), `src/data/MOCK_DATA.json`);

  const jsonData = await fsPromises.readFile(filePath);
  const objectData: {
    id: string;
    logo: string;
    name: string;
    specialties: string;
    city: string;
  }[] = JSON.parse(jsonData.toString());

  // split specialties in array
  const response = objectData.map((data) => ({
    ...data,
    specialties: data.specialties.includes(` & `)
      ? data.specialties.split(` & `)
      : data.specialties.split(` and `),
  }));

  return response;
};
