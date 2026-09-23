import apiClient from '../apiClient';

export interface StartScrapeRequest {
  url: string
  scrapeType?: string
  maxPages?: number
  knowledgeBaseId?: string
  folderId?: string
}

export interface StartScrapeResponse {
  jobId: string
  status: string
}

export async function startScraping(request: StartScrapeRequest): Promise<StartScrapeResponse> {
  const response = await apiClient.post<StartScrapeResponse>('/Scraper/start', {
    knowledgeBaseId: request.knowledgeBaseId,
    folderId: request.folderId,
    url: request.url,
    scrapeType: request.scrapeType || "Website",
    maxPages: request.maxPages || 50,
  });

  return response.data;
}

export interface ScrapeJobSummary {
  id: string;
  url: string;
  status: string;
  errorMessage?: string | null;
  scrapeType: string;
  knowledgeBaseId?: string | null;
  folderId?: string | null;
  totalPages: number;
  processedPages: number;
  maxPages: number;
  createdAt: string;
  startedAt?: string | null;
  completedAt?: string | null;
}

export async function getScrapeJobs(knowledgeBaseId: string): Promise<ScrapeJobSummary[]> {
  const response = await apiClient.get<ScrapeJobSummary[]>('/Scraper/jobs', { params: { knowledgeBaseId } });
  return response.data;
}

export interface ScrapeResultResponse {
  job: ScrapeJobSummary;
  pages: ScrapedPageDetail[];
}

export async function getScrapeResult(jobId: string): Promise<ScrapeResultResponse> {
  const response = await apiClient.get<ScrapeResultResponse>(`/Scraper/result/${jobId}`);
  return response.data;
}

export interface ScrapeStatusResponse {
  status: string;
  errorMessage: string | null;
  processedPages: number;
  totalPages: number;
  maxPages: number;
  successfulPages: number;
  failedPages: number;
}

export async function getScrapeStatus(jobId: string): Promise<ScrapeStatusResponse> {
  const response = await apiClient.get<ScrapeStatusResponse>(`/Scraper/status/${jobId}`);
  return response.data;
}

export interface ScrapedPageDetail {
  id: string;
  jobId: string;
  url: string;
  title: string | null;
  description: string | null;
  content: string | null;
  markdownContent: string | null;
  wordCount: number;
  scrapedAt: string;
  headings: { level?: number; text?: string }[];
  internalLinks: string[];
  externalLinks: string[];
  images: { src?: string; alt?: string }[];
  sizeBytes: number;
  fileName: string;
  urlPath: string;
  subFolder: string;
}

export async function getScrapedPage(pageId: string): Promise<ScrapedPageDetail> {
  const response = await apiClient.get<ScrapedPageDetail>(`/Scraper/page/${pageId}`);
  return response.data;
}
