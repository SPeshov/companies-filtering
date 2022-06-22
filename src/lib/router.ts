import Router from 'next/router';

export const updateQuery = ({
  name,
  specialties,
}: {
  name?: string;
  specialties?: string[];
}) => {
  const query = {
    ...(name ? { name: encodeURI(name) } : undefined),
    ...(specialties ? { specialties } : undefined),
  };

  Router.replace({
    pathname: `/`,
    query,
  });
};
