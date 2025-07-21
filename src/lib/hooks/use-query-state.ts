'use client';

import { useQueryState as createQueryState } from 'nuqs';

export function useQueryState() {
  const [page, setPage] = createQueryState('page', {
    defaultValue: '1',
    shallow: false,
  });
  const [search, setSearch] = createQueryState('search', {
    shallow: false,
  });
  const [status, setStatus] = createQueryState('status', {
    shallow: false,
  });
  const [species, setSpecies] = createQueryState('species', {
    shallow: false,
  });
  const [gender, setGender] = createQueryState('gender', {
    shallow: false,
  });

  return {
    page: [Number(page), setPage],
    search: [search, setSearch],
    status: [status, setStatus],
    species: [species, setSpecies],
    gender: [gender, setGender],
  } as const;
}
