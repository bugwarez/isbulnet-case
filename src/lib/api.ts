export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

interface GetCharactersOptions {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export async function getCharacters({
  page = 1,
  name,
  status,
  species,
  gender,
}: GetCharactersOptions = {}): Promise<CharactersResponse> {
  const params = new URLSearchParams();
  params.append('page', String(page));

  if (name && name.trim()) params.append('name', name.trim());

  if (status && status !== 'all') {
    console.log('Status value being sent to API:', status);
    params.append('status', status);
  }

  if (species && species !== 'all') params.append('species', species);

  if (gender && gender !== 'all') {
    const genderMap: { [key: string]: string } = {
      female: 'Female',
      male: 'Male',
      genderless: 'Genderless',
      unknown: 'unknown',
    };
    params.append('gender', genderMap[gender.toLowerCase()] || gender);
  }

  const url = `https://rickandmortyapi.com/api/character?${params.toString()}`;
  console.log('Fetching URL:', url, params);

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    const errorText = await response.text();
    console.log('Error response:', errorText);
    throw new Error(
      `Failed to fetch characters: ${response.status} - ${errorText}`
    );
  }

  return response.json();
}
