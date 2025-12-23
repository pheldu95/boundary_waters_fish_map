type FishingLure = {
  id: number
  name: string
  color: string
  addedBy: string
  createdAt: string
  caughtFish: string[]
};

type FishingLureFilters = {
    addedById?: number
};

export type {
    FishingLure,
    FishingLureFilters
};