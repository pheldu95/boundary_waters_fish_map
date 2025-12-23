import z from "zod";

const requiredString = (fieldName: string) => z.string().min(1, `${fieldName} is required`);

export const fishingLureSchema = z.object({
    name: requiredString('Name'),
    color: requiredString('Color'),
    addedBy: z.string().min(1),
});

export type FishingLureSchema = z.infer<typeof fishingLureSchema>;