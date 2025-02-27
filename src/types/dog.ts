export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export type DogSearchResponse = {
  next: string;
  resultIds: string[];
  total: number;
};
