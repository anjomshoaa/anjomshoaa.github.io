// 1. Import utilities from `astro:content`
import { defineCollection, reference, z } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

const talk = defineCollection({
  loader: file("./src/data/talks.json"),
    schema: z.object({
        title: z.string(),
        venue: z.string(),
        date: z.coerce.date(),
        category: z.string(),
        url: z.string(),
    }),
});


const thesis = defineCollection({
  loader: file("./src/data/thesis.json"),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        role: z.string(),
        year: z.coerce.number().int(),
        category: z.string(),
        url: z.string().optional(),
        url0: z.string().optional(),
        project: z.string().optional(),
    }),
});

const paper = defineCollection({
  loader: file("./src/data/papers.json"),
    schema: z.object({
        type: z.string(),
        title: z.string(),
        authors: z.string(),
        venue: z.string(),
        volume: z.string().optional(),
        issue: z.string().optional(),
        publisher: z.string().optional(),
        year: z.coerce.number().int(),
        pages: z.string().optional(),
        url: z.string().optional(),
        doi: z.string().optional(),
    }),
});


const project = defineCollection({
    loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            type: z.string(),
            full_name: z.string(),
            years: z.string(),
            summary: z.string(),
            featuredImage: image().optional(),
            heroImage: image().optional(),
            team: z.array(z.string()),
            papers: z.array(reference('paper')).optional(),
            tags: z.array(z.string()).optional(),
        }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { talk, paper, thesis, project};
