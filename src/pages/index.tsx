import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import { ParsedUrlQuery } from 'querystring';
import { fetchCompanies } from '@/lib/companies';
import { ResponseData } from '@/types';

export default function Home({ data }: ResponseData) {
  console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="grid grid-cols-4 gap-4">
          {data.companies.map(({ name, id }) => (
            <div key={id}>{name}</div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{` `}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps({ query }: { query: ParsedUrlQuery }) {
  const filters = query.filters as string[];

  const data = await fetchCompanies({ filters });

  return { props: { data } };
}
