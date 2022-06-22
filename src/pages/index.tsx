import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import { ParsedUrlQuery } from 'querystring';
import { fetchCompanies } from '@/lib/companies';
import { Company, ResponseData } from '@/types';
import { Filters } from '@/components/filters';
import { useState } from 'react';

export default function Home({ data }: ResponseData) {
  const [companies, setCompanies] = useState<Company[]>(
    data.companies ? data.companies : [],
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <Filters setSearchResults={setCompanies} serverData={data.companies} />
        <div className="grid grid-cols-4 gap-4">
          {companies.map(({ name, id, specialties, logo, city }) => (
            <div
              key={id}
              className="max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <Image
                src={logo}
                alt="Vercel Logo"
                width={250}
                height={250}
                layout="responsive"
              />

              <div className="p-5">
                <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
                  {name}
                </h5>

                <div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    <svg
                      className="mr-1 w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    {city}
                  </span>
                </div>

                <div>
                  {specialties.map((specialtie, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                    >
                      {specialtie}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const name = query.name as string;

  const data = await fetchCompanies({ filters: { name } });

  return { props: { data } };
}
