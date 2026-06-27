import apiClient from '../apiClient';

export interface StartScrapeRequest {
  organizationId: string
  url: string
  scrapeType?: string
  maxPages?: number
}

export interface StartScrapeResponse {
  jobId: string
  status: string
}

export async function startScraping(request: StartScrapeRequest): Promise<StartScrapeResponse> {
  const response = await apiClient.post<StartScrapeResponse>('/Scraper/start', {
    organizationId: request.organizationId,
    url: request.url,
    scrapeType: request.scrapeType || "Website",
    maxPages: request.maxPages || 50,
  });

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
