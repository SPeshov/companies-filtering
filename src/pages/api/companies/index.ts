import { getData } from '@/data';
import { ResponseData } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = ResponseData['data'];

const getAvalableSpecialties = async () => {
  const companies = await getData();

  const specialties = new Set<string>();

  const allSpecialties = companies.flatMap((company) => company.specialties);

  allSpecialties.forEach((specialti) => {
    specialties.add(specialti);
  });

  return [...specialties];
};

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

  const companies = await getData();
  const specialties = await getAvalableSpecialties();

  return res.status(200).json({ message: `Success`, companies, specialties });
}
