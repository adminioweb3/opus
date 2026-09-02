"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJourneyStore } from "@/lib/stores/journey-store";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { startScraping, getScrapeStatus } from "@/lib/api/scraperApi";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { WebsiteStep } from "@/components/onboarding/WebsiteStep";
import { BusinessStep, type BusinessStepData } from "@/components/onboarding/BusinessStep";
import { DashboardPreview } from "@/components/onboarding/DashboardPreview";
import { ValuePanel } from "@/components/onboarding/ValuePanel";

export default function JourneyOnboardingPage() {
  const router = useRouter();
  const {
    websiteUrl,
    businessName,
    industry,
    country,
    targetAudience,
    products,
    keywords,
    customIndustry,
    whoDoYouSellTo,
    knownCompetitors,
    mainOffering,
    updateOnboardingData,
    setState,
  } = useJourneyStore();
  const { organizationId } = useOrganizationStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeProgress, setScrapeProgress] = useState(0);
  const [scrapeWarning, setScrapeWarning] = useState<string | null>(null);

  const goNext = async () => {
    if (organizationId) {
      try {
        setScrapeWarning(null);
        setIsScraping(true);
        setScrapeProgress(10);
        const formattedUrl = websiteUrl.startsWith("http")
          ? websiteUrl
          : `https://${websiteUrl}`;
        const result = await startScraping({
          url: formattedUrl,
          scrapeType: "Website",
          maxPages: 15,
        });

        let currentStatus = result.status;
        let attempts = 0;
        while (currentStatus === "Pending" || currentStatus === "Processing") {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          attempts++;

          setScrapeProgress(Math.min(90, 10 + attempts * 15));

          try {
            const statusRes = await getScrapeStatus(result.jobId);
            currentStatus = statusRes.status;
          } catch (e) {
            console.warn("Polling error ignored", e);
          }

          if (attempts > 30) {
            throw new Error("Scraping timed out");
          }
        }

        if (currentStatus === "Failed") {
          throw new Error("Scraping failed on the server.");
        }

        setScrapeProgress(100);
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Auto-fill business name from domain if it's currently empty
        if (!businessName) {
          try {
            const urlObj = new URL(formattedUrl);
            let domainName = urlObj.hostname.replace(/^www\./, '');
            // Capitalize first letter and split by dots
            domainName = domainName.split('.')[0];
            domainName = domainName.charAt(0).toUpperCase() + domainName.slice(1);
            if (domainName) {
              updateOnboardingData({ businessName: domainName });
            }
          } catch {
            // Ignore URL parsing errors
          }
        }

        setCurrentStep(2);
      } catch (err) {
        console.error("Failed to start scraping or scraping timed out/failed", err);
        setScrapeWarning("We could not finish the website scan yet. You can continue and we will use your answers to build the report.");
        // If scraping fails or returns no pages, proceed to the next step with clear fallback context.
        setCurrentStep(2);
      } finally {
        setIsScraping(false);
        setScrapeProgress(0);
      }
    } else {
      setCurrentStep(2);
    }
  };

  const finish = () => {
    setState("analyzing");
    router.push("/onboarding/analysis");
  };

  const businessData: BusinessStepData = {
    businessName,
    websiteUrl,
    industry,
    customIndustry,
    country,
    targetAudience,
    products,
    keywords,
    whoDoYouSellTo,
    knownCompetitors,
    mainOffering,
  };

  const handleBusinessChange = (field: keyof BusinessStepData, value: string) => {
    if (field === "websiteUrl") return; // read-only in step 2
    updateOnboardingData({ [field]: value });
  };

  return (
    <>
      <div className="fixed top-6 right-8 z-40 hidden lg:block">
        <Link
          href="/login"
          className="text-[13.5px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Already have an account? <span className="text-[#5B5CEB] font-semibold">Log in</span>
        </Link>
      </div>

      <OnboardingLayout
        currentStep={currentStep}
        rightPanel={currentStep === 1 ? <DashboardPreview /> : <ValuePanel />}
        cta={
          currentStep === 1
            ? {
                label: "Continue",
                onClick: goNext,
                disabled: !websiteUrl || isScraping,
                loading: isScraping,
              }
            : {
                label: "Generate AI Visibility Report",
                onClick: finish,
                disabled: !businessName || (keywords ? keywords.split(",").filter(k => k.trim()).length < 5 : true),
              }
        }
      >
        {currentStep === 1 ? (
          <WebsiteStep
            value={websiteUrl}
            onChange={(v) => updateOnboardingData({ websiteUrl: v })}
            onContinue={goNext}
            isScraping={isScraping}
            scrapeProgress={scrapeProgress}
          />
        ) : (
          <BusinessStep
            data={businessData}
            onChange={handleBusinessChange}
            onSubmit={finish}
            warning={scrapeWarning}
          />
        )}
      </OnboardingLayout>
    </>
  );
}
