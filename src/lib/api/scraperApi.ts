import apiClient from '../apiClient';

export interface StartScrapeRequest {
  organizationId: string
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
    organizationId: request.organizationId,
    knowledgeBaseId: request.knowledgeBaseId,
    folderId: request.folderId,
    url: request.url,
    scrapeType: request.scrapeType || "Website",
    maxPages: request.maxPages || 50,
  });

  return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getScrapeJobs(organizationId: string, knowledgeBaseId: string): Promise<any[]> {
  const response = await apiClient.get<any[]>('/Scraper/jobs', { params: { organizationId, knowledgeBaseId } });
  return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getScrapeResult(jobId: string): Promise<any> {
  const response = await apiClient.get(`/Scraper/result/${jobId}`);
  return response.data;
}

export interface ScrapeStatusResponse {
  status: string;
  processedPages: number;
  totalPages: number;
  maxPages: number;
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
