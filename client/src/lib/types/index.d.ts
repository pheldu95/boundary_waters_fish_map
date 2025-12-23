// typescript definition file
type FishSpecies = {
  id: number
  name: string
  caughtFish: string[]
};

type User = {
  id: number
  email: string
};

type Campsite = {
  id: number
  url: string
  latitude: number
  longitude: number
};

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

export type { FishSpecies, FishingLure, User, HydraCollection, Campsite };