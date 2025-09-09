import { config } from 'dotenv';
config();

import '@/ai/flows/generate-article-from-prompt.ts';
import '@/ai/flows/summarize-existing-article.ts';
import '@/ai/flows/analyze-content-for-seo.ts';