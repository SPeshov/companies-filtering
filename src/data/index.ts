import fsPromises from 'fs/promises';
import path from 'path';

export const getData = async () => {
  const filePath = path.join(process.cwd(), `src/data/MOCK_DATA.json`);

  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString());
  return objectData;
};
