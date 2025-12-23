import z from "zod";

const requiredString = (fieldName: string) => z.string().min(1, `${fieldName} is required`);

export const caughtFishSchema = z.object({
    caughtDate: requiredString('Date'),
    fishSpecies: requiredString('Species'),
    fishingLure: requiredString('Lure'),

    length: z
        .string()
        .optional()
        .transform(val => (val ? Number(val) : null))
        .refine(
            val => val === null || (!isNaN(val) && val >= 0),
            "Length must be a non-negative number"
        ),

    note: z.string().optional(),

    latitude: z.string(),
    longitude: z.string(),

    caughtBy: z.string().min(1),
});

export type CaughtFishSchema = z.infer<typeof caughtFishSchema>;