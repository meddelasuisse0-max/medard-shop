'use server';
/**
 * @fileOverview An AI product recommender for Médard Ligne.
 *
 * - recommendProducts - A function that generates personalized product recommendations.
 * - RecommendProductsInput - The input type for the recommendProducts function.
 * - RecommendProductsOutput - The return type for the recommendProducts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendProductsInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe('A list of product names or IDs that the user has recently viewed.'),
  popularItems: z
    .array(z.string())
    .describe('A list of currently popular Médard Ligne products.'),
  existingProducts: z
    .array(
      z.object({
        id: z.string().describe('Unique identifier of the product.'),
        name: z.string().describe('Name of the product.'),
        description: z.string().describe('Detailed description of the product.'),
        category: z.string().describe('Category of the product (e.g., fragrance, skincare).'),
      })
    )
    .describe('A list of all available Médard Ligne products with their details.'),
});
export type RecommendProductsInput = z.infer<typeof RecommendProductsInputSchema>;

const RecommendProductsOutputSchema = z.object({
  recommendedProducts: z
    .array(z.string())
    .describe('A list of recommended Médard Ligne product names.'),
});
export type RecommendProductsOutput = z.infer<typeof RecommendProductsOutputSchema>;

export async function recommendProducts(
  input: RecommendProductsInput
): Promise<RecommendProductsOutput> {
  return recommendProductsFlow(input);
}

const recommendProductsPrompt = ai.definePrompt({
  name: 'recommendProductsPrompt',
  input: { schema: RecommendProductsInputSchema },
  output: { schema: RecommendProductsOutputSchema },
  prompt: `You are an AI product recommender for Médard Ligne, a premium product line known for its elegance and sophistication. Your goal is to suggest relevant products to a customer based on their interests and popular items.

Available Médard Ligne products:
{{#each existingProducts}}
- ID: {{this.id}}, Name: {{this.name}}, Description: {{this.description}}, Category: {{this.category}}
{{/each}}

User's recent browsing history:
{{#if browsingHistory}}
{{#each browsingHistory}}
- {{{this}}}
{{/each}}
{{else}}
No browsing history available.
{{/if}}

Currently popular Médard Ligne products:
{{#if popularItems}}
{{#each popularItems}}
- {{{this}}}
{{/each}}
{{else}}
No popular items available.
{{/if}}

Based on the user's browsing history and popular items, recommend 3-5 Médard Ligne products from the "Available Médard Ligne products" list that the user might be interested in. Only recommend products that are explicitly listed as available. Provide only the names of the recommended products.
`,
});

const recommendProductsFlow = ai.defineFlow(
  {
    name: 'recommendProductsFlow',
    inputSchema: RecommendProductsInputSchema,
    outputSchema: RecommendProductsOutputSchema,
  },
  async (input) => {
    const { output } = await recommendProductsPrompt(input);
    return output!;
  }
);
