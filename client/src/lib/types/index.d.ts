// typescript definition file
type FishSpecies = {
  id: number
  name: string
  caughtFish: string[]
};

type CaughtFish = {
  id: number
  latitude: string
  longitude: string
  caughtDate: string
  caughtBy: string
  fishSpecies: FishSpecies
  fishingLure: FishingLure
  length: number | null
};

type FishingLure = {
  id: number
  name: string
  color: string
  addedBy: string
  createdAt: string
  caughtFish: string[]
};

type User = {
    id: number
    email: string
}

type HydraCollection<T> = {
  '@context': string;
  '@id': string;
  '@type': string;
  totalItems: number;
  member: T[];
  view?: {
    '@id': string;
    '@type': string;
    first?: string;
    last?: string;
    next?: string;
    previous?: string;
  };
  search?: {
    '@type': string;
    template: string;
    variableRepresentation: string;
    mapping: Array<{
      '@type': string;
      variable: string;
      property: string;
      required: boolean;
    }>;
  };
}

export type { FishSpecies, CaughtFish, FishingLure, User, HydraCollection };