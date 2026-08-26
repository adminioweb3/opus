import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AppToaster } from "@/components/ui/app-toaster";

export const metadata: Metadata = {
  title: "CITATIONLY | Enterprise AI Visibility Tracking & AI Search Optimization",
  description: "Optimize your brand's Share of Voice across ChatGPT, Gemini, Claude, and Perplexity. The leading platform for GEO, AI Citation Monitoring, and LLM Visibility.",
  openGraph: {
    title: "CITATIONLY | Enterprise AI Visibility Tracking",
    description: "Optimize your brand's Share of Voice across ChatGPT, Gemini, Claude, and Perplexity.",
    url: "https://citationly.com",
    siteName: "CITATIONLY",
    images: [{ url: "https://citationly.com/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CITATIONLY | Enterprise AI Visibility Tracking",
    description: "Optimize your brand's Share of Voice across ChatGPT, Gemini, Claude, and Perplexity.",
    creator: "@citationly_hq",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.47.0/tabler-icons.min.css" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <AppToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
