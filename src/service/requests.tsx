/** @format */

import axiosInstance from "./axiosInstance";
import {
  useQuery,
  useMutation,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface QueryI<TData, TError = AxiosError> {
  url: string;
  params?: Record<string, any>;
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">;
  isClick?: boolean;
}

export const useGetRequest = <TData = unknown, TError = AxiosError>({
  url,
  params,
  isClick = false,
  options,
}: QueryI<TData, TError>) => {
  if (isClick) {
    return useMutation<TData, TError>({
      mutationFn: async () => {
        const res = await axiosInstance.get<TData>(url, { params });
        return res.data;
      },
    });
  }

  return useQuery<TData, TError>({
    queryKey: [url, params] as const,
    queryFn: async () => {
      const res = await axiosInstance.get<TData>(url, { params });
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 5,
    ...(options || {}),
  });
};

interface MutateI<TBody = unknown> {
  url: string;
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  data?: TBody;
}

export const useMutateRequest = <
  TResponse = unknown,
  TBody = unknown,
  TError = AxiosError
>() => {
  return useMutation<TResponse, TError, MutateI<TBody>>({
    mutationFn: async ({ url, method, data }) => {
      const res = await axiosInstance.request<TResponse>({
        url,
        method,
        data,
      });
      return res.data;
    },
  });
};
