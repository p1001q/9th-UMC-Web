import type { PaginationDto } from "../types/common.ts";
import type { ResponseLpListDto } from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";

export const getLpList = async (
    paginationDto: PaginationDto,
) :Promise<ResponseLpListDto>=> {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto, // 여기 안에 order 포함돼야 함
  });
  
  return data;
};

export const getLpDetail = async (id: number) => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};

