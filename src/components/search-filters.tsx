'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { useQueryState } from '@/lib/hooks/use-query-state';
import { useFilterStore } from '@/lib/store/filter-store';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useState, useEffect, useCallback } from 'react';

export function SearchFilters() {
  const queryState = useQueryState();
  const [search, setSearch] = queryState.search;
  const [status, setStatus] = queryState.status;
  const [species, setSpecies] = queryState.species;
  const [gender, setGender] = queryState.gender;

  const filterStore = useFilterStore();

  const [inputValue, setInputValue] = useState(() => search || '');

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    const newValue = debouncedValue || null;
    if (newValue !== search) {
      filterStore.setSearch(debouncedValue);
      setSearch(newValue);
    }
  }, [debouncedValue, filterStore, setSearch, search]);

  useEffect(() => {
    if (search) {
      setInputValue(search);
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      filterStore.setStatus(value);
      setStatus(value);
    },
    [filterStore, setStatus]
  );

  const handleSpeciesChange = useCallback(
    (value: string) => {
      filterStore.setSpecies(value);
      setSpecies(value);
    },
    [filterStore, setSpecies]
  );

  const handleGenderChange = useCallback(
    (value: string) => {
      filterStore.setGender(value);
      setGender(value);
    },
    [filterStore, setGender]
  );
  const handleReset = useCallback(() => {
    setInputValue('');
    filterStore.resetFilters();
    setSearch(null);
    setStatus(null);
    setSpecies(null);
    setGender(null);
  }, [filterStore, setSearch, setStatus, setSpecies, setGender]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Karakterleri Ara"
          className="pl-10 h-12 text-base"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={status || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[140px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Durumu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="alive">Hayatta</SelectItem>
            <SelectItem value="dead">Ölü</SelectItem>
            <SelectItem value="unknown">Bilinmiyor</SelectItem>
          </SelectContent>
        </Select>

        <Select value={species || 'all'} onValueChange={handleSpeciesChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Türü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="human">İnsan</SelectItem>
            <SelectItem value="alien">Uzaylı</SelectItem>
            <SelectItem value="robot">Robot</SelectItem>
          </SelectContent>
        </Select>

        <Select value={gender || 'all'} onValueChange={handleGenderChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Cinsiyeti" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="male">Erkek</SelectItem>
            <SelectItem value="female">Kadın</SelectItem>
            <SelectItem value="genderless">Cinsiyetsiz</SelectItem>
            <SelectItem value="unknown">Bilinmiyor</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          className="ml-auto bg-transparent"
          onClick={handleReset}
          disabled={
            !search && status === 'all' && species === 'all' && gender === 'all'
          }
        >
          <X className="w-4 h-4 mr-2" />
          Filtreleri Temizle
        </Button>
      </div>
    </div>
  );
}
