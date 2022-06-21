import { getData } from '@/data';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  companies?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method } = req;

  if (method === `GET`) {
    return res.status(200).json({ message: `Error` });
  }

  const { body } = req;

  const companies = await getData();

  return res.status(200).json({ message: `Success`, companies });
}
