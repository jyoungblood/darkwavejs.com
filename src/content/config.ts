import { defineCollection, z } from 'astro:content';

// Flexible schema that accepts Starlight fields but doesn't require them
const docsSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	status: z.enum(['draft', 'published']).optional(),
	// Allow sidebar config from Starlight (we'll ignore it)
	sidebar: z.object({
		order: z.number().optional(),
		label: z.string().optional(),
	}).optional(),
});

const blogSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	tags: z.array(z.string()).default([]),
	collections: z.array(z.string()).default([]),
	primary_image: z.string().optional(),
	date: z.string(),
	status: z.enum(['draft', 'published']).optional(),
});

export const collections = {
	docs: defineCollection({
		type: 'content',
		schema: docsSchema,
	}),
	fieldguide: defineCollection({
		type: 'content',
		schema: docsSchema,
	}),
	blog: defineCollection({
		type: 'content',
		schema: blogSchema,
	}),
};
