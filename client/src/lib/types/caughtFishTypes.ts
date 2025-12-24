import type { FishingLure, FishSpecies } from ".";

type CaughtFishRead = {
  id?: number
  latitude: string
  longitude: string
  caughtDate: string
  caughtBy: string
  fishSpecies: FishSpecies
  fishingLure: FishingLure
  length: number | null
  note?: string | undefined
};
type CaughtFishWrite = {
  id?: number
  latitude: string
  longitude: string
  caughtDate: string
  caughtBy: string
  fishSpecies: string
  fishingLure: string
  length: number | null
  note?: string | undefined
};

type CaughtFishFilters = {
  fishSpeciesIds?: string[];
  fishingLureIds?: string[];
  caughtById?: number //maybe need to make this a string?
  length?: number
}

export type { CaughtFishRead, CaughtFishWrite, CaughtFishFilters };