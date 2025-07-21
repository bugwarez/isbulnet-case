import { Hero } from '@/components/hero';
import { SearchFilters } from '@/components/search-filters';
import { CharacterCard } from '@/components/character-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { charactersQueryOptions } from '@/lib/queries/useCharactersQuery';
import { getQueryClient } from '@/lib/react-query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getCharacters } from '@/lib/api';

async function getCharactersData(options = {}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(charactersQueryOptions(options));
  return dehydrate(queryClient);
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    species?: string;
    gender?: string;
  };
}) {
  const page = Number(await Promise.resolve(searchParams.page)) || 1;
  const search = await Promise.resolve(searchParams.search);
  const status = await Promise.resolve(searchParams.status);
  const species = await Promise.resolve(searchParams.species);
  const gender = await Promise.resolve(searchParams.gender);

  const queryOptions = {
    page,
    name: search || undefined,
    status: status && status !== 'all' ? status : undefined,
    species: species && species !== 'all' ? species : undefined,
    gender: gender && gender !== 'all' ? gender : undefined,
  };

  const dehydratedState = await getCharactersData(queryOptions);
  const data = await getCharacters(queryOptions);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="min-h-screen bg-background">
        <Hero />
        <main className="container py-12 space-y-12">
          <SearchFilters />
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Karakterler&nbsp;({data.info.count} sonuç)
              </h2>
              <div className="text-sm text-muted-foreground">
                {data.info.count} karakterden {page}.sayfada 20 tanesi
                gösteriliyor
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {data.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
              {page > 1 ? (
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      ...(search ? { search } : {}),
                      ...(status && status !== 'all' ? { status } : {}),
                      ...(species && species !== 'all' ? { species } : {}),
                      ...(gender && gender !== 'all' ? { gender } : {}),
                      page: page - 1,
                    },
                  }}
                >
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}

              <div className="flex space-x-1">
                {[...Array(Math.min(3, data.info.pages))].map((_, i) => (
                  <Link
                    key={i + 1}
                    href={{
                      pathname: '/',
                      query: {
                        ...(search ? { search } : {}),
                        ...(status && status !== 'all' ? { status } : {}),
                        ...(species && species !== 'all' ? { species } : {}),
                        ...(gender && gender !== 'all' ? { gender } : {}),
                        page: i + 1,
                      },
                    }}
                  >
                    <Button
                      variant={page === i + 1 ? 'default' : 'outline'}
                      size="sm"
                    >
                      {i + 1}
                    </Button>
                  </Link>
                ))}
                {data.info.pages > 3 && (
                  <>
                    <span className="px-3 py-2 text-sm text-muted-foreground">
                      ...
                    </span>
                    <Link
                      href={{
                        pathname: '/',
                        query: {
                          ...(search ? { search } : {}),
                          ...(status && status !== 'all' ? { status } : {}),
                          ...(species && species !== 'all' ? { species } : {}),
                          ...(gender && gender !== 'all' ? { gender } : {}),
                          page: data.info.pages,
                        },
                      }}
                    >
                      <Button variant="outline" size="sm">
                        {data.info.pages}
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {page < data.info.pages ? (
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      ...(search ? { search } : {}),
                      ...(status && status !== 'all' ? { status } : {}),
                      ...(species && species !== 'all' ? { species } : {}),
                      ...(gender && gender !== 'all' ? { gender } : {}),
                      page: page + 1,
                    },
                  }}
                >
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </section>
        </main>
      </div>
    </HydrationBoundary>
  );
}
