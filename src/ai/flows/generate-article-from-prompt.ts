'use server';
/**
 * @fileOverview Generates an article based on a user-provided prompt.
 *
 * - generateArticleFromPrompt - A function that generates an article from a prompt.
 * - GenerateArticleFromPromptInput - The input type for the generateArticleFromPrompt function.
 * - GenerateArticleFromPromptOutput - The return type for the generateArticleFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleFromPromptInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate the article from.'),
});
export type GenerateArticleFromPromptInput = z.infer<typeof GenerateArticleFromPromptInputSchema>;

const GenerateArticleFromPromptOutputSchema = z.object({
  article: z.string().describe('The generated article.'),
});
export type GenerateArticleFromPromptOutput = z.infer<typeof GenerateArticleFromPromptOutputSchema>;

export async function generateArticleFromPrompt(input: GenerateArticleFromPromptInput): Promise<GenerateArticleFromPromptOutput> {
  return generateArticleFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleFromPromptPrompt',
  input: {schema: GenerateArticleFromPromptInputSchema},
  output: {schema: GenerateArticleFromPromptOutputSchema},
  prompt: `Generate an article based on the following prompt:\n\n{{prompt}}`,
});

const generateArticleFromPromptFlow = ai.defineFlow(
  {
    name: 'generateArticleFromPromptFlow',
    inputSchema: GenerateArticleFromPromptInputSchema,
    outputSchema: GenerateArticleFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
