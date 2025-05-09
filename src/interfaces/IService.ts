export interface IService {
  id: string;
  name: string;
  duration: number;
  description: string;
  price: number;
}

export interface IServiceResponse {
  id: string;
  name: string;
  employee: { id: string; name: string };
}
