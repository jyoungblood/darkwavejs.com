import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
	fieldguide: defineCollection({
		type: 'content',
		schema: z.object({
			title: z.string(),
			description: z.string().optional(),
		}),
	}),
};
