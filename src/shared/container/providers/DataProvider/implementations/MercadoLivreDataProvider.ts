import { AxiosRequestConfig, AxiosResponse } from "axios";

import AppError from "@shared/errors/AppError";
import { SERVER_ERROR } from "@shared/errors/ErrorMessages";
import api from "@shared/infra/mercado-livre/services/api";

import IDataProvider from "../models/IDataProvider";

class MercadoLivreDataProvider implements IDataProvider {
  public async post<T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await api.post(url, data, config);

      return response;
    } catch (err) {
      throw new AppError(SERVER_ERROR, 500);
    }
  }

  public async patch<T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await api.patch(url, data, config);

      return response;
    } catch (err) {
      throw new AppError(SERVER_ERROR, 500);
    }
  }

  public async delete<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      const response = await api.delete(url);

      return response;
    } catch (err) {
      throw new AppError(SERVER_ERROR, 500);
    }
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await api.get(url, config);

      return response;
    } catch (err) {
      throw new AppError(SERVER_ERROR, 500);
    }
  }
}

export default MercadoLivreDataProvider;
