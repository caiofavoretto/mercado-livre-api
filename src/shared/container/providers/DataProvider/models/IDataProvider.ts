import { AxiosResponse, AxiosRequestConfig } from "axios";

export default interface IDataProvider {
  post<T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>>;

  patch<T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>>;

  get<T>(
    url: string,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>>;

  delete<T>(url: string): Promise<AxiosResponse<T>>;
}
