// Real logos via favicon lookup — same technique already used for organization logos
// in DashboardSidebar.tsx. No brand assets are bundled/hosted by us; this just resolves
// each site's own publicly-served favicon.

export function extractDomain(urlOrDomain: string): string | null {
  if (!urlOrDomain) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(urlOrDomain) ? urlOrDomain : `https://${urlOrDomain}`;
    return new URL(withProtocol).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

export function getDomainLogoUrl(urlOrDomain: string | null | undefined, size: number = 128): string | null {
  if (!urlOrDomain) return null;
  const domain = extractDomain(urlOrDomain);
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

// Fixed, known domains for the AI platforms this app tracks — used to fetch each
// model's real logo the same way, since these aren't arbitrary user-supplied URLs.
const AI_PLATFORM_DOMAINS: Record<string, string> = {
  'ChatGPT': 'openai.com',
  'Claude': 'anthropic.com',
  'Gemini': 'gemini.google.com',
  'Google AI Overview': 'google.com',
  'Perplexity': 'perplexity.ai',
  'Microsoft Copilot': 'copilot.microsoft.com',
  'Copilot': 'copilot.microsoft.com',
  'Meta AI': 'meta.ai',
  'Grok': 'x.ai',
  'DeepSeek': 'deepseek.com',
};

export function getPlatformLogoUrl(platformName: string, size: number = 128): string | null {
  const domain = AI_PLATFORM_DOMAINS[platformName];
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}` : null;
}
