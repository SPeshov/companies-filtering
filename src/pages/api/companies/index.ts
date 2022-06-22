import { getData } from '@/data';
import { filterCompanies, getAvailableSpecialties } from '@/lib/companies';
import { ResponseData } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = ResponseData['data'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method } = req;

  if (method === `GET`) {
    return res
      .status(200)
      .json({ message: `Error`, companies: [], specialties: [] });
  }

  const { body } = req;

  const { filters } = body;

  const data = await getData();
  const companies = filters
    ? filterCompanies({ filters, companies: data })
    : data;

  const specialties = await getAvailableSpecialties();

  return res.status(200).json({ message: `Success`, companies, specialties });
}
