export type Company = {
  id: string;
  logo: string;
  name: string;
  specialties: string[];
};

export type ResponseData = {
  data: {
    message: string;
    companies: Company[];
    specialties: string[];
  };
};
