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

export type { CaughtFishRead, CaughtFishWrite };