export interface Country {
  id: number;
  name: string;
  code: string;
  phone: string;
}
export interface CountryApiResponse {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes?: string[];
  };
}
