'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SearchCheck, LoaderCircle, Lightbulb, ClipboardCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { analyzeContentForSEO } from '@/ai/flows/analyze-content-for-seo';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  content: z.string().min(50, {
    message: 'Content must be at least 50 characters for analysis.',
  }),
  keywordSuggestions: z.string().min(3, {
    message: 'Please suggest at least one keyword.',
  }),
});

type AnalysisResult = {
  analysis: string;
  suggestedImprovements: string;
};

export default function SeoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      keywordSuggestions: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeContentForSEO(values);
      setResult(analysisResult);
      toast({
        title: 'Analysis Complete!',
        description: 'Your SEO report is ready.',
      });
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was a problem analyzing your content. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">SEO Optimization Analyzer</h1>
        <p className="text-muted-foreground">Improve your search engine rankings with AI-powered insights.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Content Analysis</CardTitle>
          <CardDescription>Paste your content and target keywords to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your full article or blog post here..." className="min-h-[200px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywordSuggestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AI content, SEO tips, digital marketing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <SearchCheck className="mr-2 h-4 w-4" />
                    Analyze Content
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || result) && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
                SEO Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              {isLoading && (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              )}
              {result?.analysis && <div dangerouslySetInnerHTML={{ __html: result.analysis.replace(/\n/g, '<br />') }} />}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                Suggested Improvements
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              {isLoading && (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              )}
              {result?.suggestedImprovements && <div dangerouslySetInnerHTML={{ __html: result.suggestedImprovements.replace(/\n/g, '<br />') }} />}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
