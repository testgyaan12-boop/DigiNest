'use server';
/**
 * @fileOverview An SEO content analysis AI agent.
 *
 * - analyzeContentForSEO - A function that handles the content analysis process.
 * - AnalyzeContentForSEOInput - The input type for the analyzeContentForSEO function.
 * - AnalyzeContentForSEOOutput - The return type for the analyzeContentForSEO function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentForSEOInputSchema = z.object({
  content: z.string().describe('The content to analyze for SEO keywords.'),
  keywordSuggestions: z.string().describe('Suggested keywords to improve SEO ranking.'),
});
export type AnalyzeContentForSEOInput = z.infer<typeof AnalyzeContentForSEOInputSchema>;

const AnalyzeContentForSEOOutputSchema = z.object({
  analysis: z.string().describe('The SEO analysis of the content.'),
  suggestedImprovements: z.string().describe('Suggested improvements to enhance SEO ranking.'),
});
export type AnalyzeContentForSEOOutput = z.infer<typeof AnalyzeContentForSEOOutputSchema>;

export async function analyzeContentForSEO(input: AnalyzeContentForSEOInput): Promise<AnalyzeContentForSEOOutput> {
  return analyzeContentForSEOFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContentForSEOPrompt',
  input: {schema: AnalyzeContentForSEOInputSchema},
  output: {schema: AnalyzeContentForSEOOutputSchema},
  prompt: `You are an SEO expert. Analyze the following content and suggest keywords to improve its search engine ranking.

Content: {{{content}}}

Suggested Keywords: {{{keywordSuggestions}}}

Provide an analysis of the content and suggest improvements to enhance SEO ranking.`,
});

const analyzeContentForSEOFlow = ai.defineFlow(
  {
    name: 'analyzeContentForSEOFlow',
    inputSchema: AnalyzeContentForSEOInputSchema,
    outputSchema: AnalyzeContentForSEOOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
