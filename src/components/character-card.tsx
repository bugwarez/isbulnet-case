import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Tv } from "lucide-react";
import { CharacterBadge } from "./character-badge";
import type { Character } from "@/types/character";
import Image from "next/image";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border/50 overflow-hidden h-48">
      <div className="flex h-full">
        <div className="relative w-32 sm:w-40 md:w-48 flex-shrink-0 h-full">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
            priority
          />
        </div>
        <div className="flex-1 p-3 sm:p-4 space-y-2 sm:space-y-3 flex flex-col justify-center min-w-0">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors truncate">
              {character.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <CharacterBadge variant="status" status={character.status} />
              {/* Species datası typed olmadığı için api'dan gelen datayı direkt yazdırıyoruz. */}
              <CharacterBadge variant="info" text={character.species} />
              <CharacterBadge variant="info" text={character.gender} />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs">
                  Son görüldüğü yer:
                </p>
                <p className="text-foreground font-medium truncate">
                  {character.location.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs">
                  İlk görüldüğü yer:
                </p>
                <p className="text-foreground font-medium truncate">
                  {character.episode[0]?.split("/").pop()}.Bölüm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
