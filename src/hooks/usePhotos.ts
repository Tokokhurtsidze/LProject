
import { useQuery } from "@tanstack/react-query";
import { fetchPhotos } from "../api/unsplash";

export const usePhotos = (query: string, page: number) => {
  return useQuery({
    queryKey: ["photos", query, page],
    queryFn: () => fetchPhotos(page, query),
    staleTime: 1000 * 60 * 5,
  });
};
