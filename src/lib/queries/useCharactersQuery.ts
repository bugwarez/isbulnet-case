import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCharacters } from "../api";

export function useCharactersQuery(options = {}) {
  return useQuery({
    ...charactersQueryOptions(options),
  });
}

export const charactersQueryOptions = ({
  page = 1,
  name,
  status,
  species,
  gender,
}: {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
} = {}) =>
  queryOptions({
    queryKey: ["characters", { page, name, status, species, gender }],
    queryFn: () => getCharacters({ page, name, status, species, gender }),
    staleTime: 5 * 60 * 1000,
  });
