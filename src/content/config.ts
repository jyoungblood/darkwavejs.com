import { defineCollection, z } from 'astro:content';

// Flexible schema that accepts Starlight fields but doesn't require them
const docsSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	// Allow sidebar config from Starlight (we'll ignore it)
	sidebar: z.object({
		order: z.number().optional(),
		label: z.string().optional(),
	}).optional(),
});

export const collections = {
	docs: defineCollection({
		type: 'content',
		schema: docsSchema,
	}),
	components: defineCollection({
		type: 'content',
		schema: docsSchema,
	}),
	fieldguide: defineCollection({
		type: 'content',
		schema: docsSchema,
	}),
};
