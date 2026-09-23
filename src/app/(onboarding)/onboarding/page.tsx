"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJourneyStore } from "@/lib/stores/journey-store";
import { useOrganizationStore } from "@/lib/stores/organizationStore";
import { startScraping, getScrapeStatus } from "@/lib/api/scraperApi";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { WebsiteStep } from "@/components/onboarding/WebsiteStep";
import { BusinessStep, type BusinessStepData } from "@/components/onboarding/BusinessStep";
import { DashboardPreview } from "@/components/onboarding/DashboardPreview";
import { ValuePanel } from "@/components/onboarding/ValuePanel";
import { InlineLoader } from "@/components/ui/loader";
import { useAuthStore } from "@/lib/stores/auth-store";

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
  const { logout } = useAuthStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeProgress, setScrapeProgress] = useState(0);
  const [scrapeWarning, setScrapeWarning] = useState<string | null>(null);
  const [isGoingToLogin, setIsGoingToLogin] = useState(false);

  const goToLogin = async () => {
    setIsGoingToLogin(true);
    await logout();
    router.replace("/login");
  };

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
          maxPages: 30,
        });

        let currentStatus = result.status;
        let latestStatus = null as Awaited<ReturnType<typeof getScrapeStatus>> | null;
        let attempts = 0;
        let consecutivePollingErrors = 0;
        while (currentStatus === "Pending" || currentStatus === "Processing") {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          attempts++;

          try {
            const statusRes = await getScrapeStatus(result.jobId);
            latestStatus = statusRes;
            currentStatus = statusRes.status;
            consecutivePollingErrors = 0;
            const pageProgress = statusRes.maxPages > 0
              ? Math.round((statusRes.processedPages / statusRes.maxPages) * 75)
              : 0;
            setScrapeProgress(Math.min(90, Math.max(15, 15 + pageProgress)));
          } catch (e) {
            consecutivePollingErrors++;
            console.warn("Scrape status polling failed", e);
            if (consecutivePollingErrors >= 3) {
              throw new Error("Lost contact with the website scanner.");
            }
          }

          if (attempts > 90) {
            throw new Error("Website scanning timed out.");
          }
        }

        if (currentStatus === "Failed") {
          throw new Error(latestStatus?.errorMessage || "Website scanning failed on the server.");
        }
        if (!latestStatus || latestStatus.successfulPages < 1) {
          throw new Error("The scanner completed without saving any website pages.");
        }
        if (latestStatus.successfulPages < 3) {
          setScrapeWarning(
            `The scan saved only ${latestStatus.successfulPages} page${latestStatus.successfulPages === 1 ? "" : "s"}. ` +
            "The report will clearly distinguish website evidence from the answers you provide below."
          );
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
        const message = err instanceof Error ? err.message : "The website scanner did not complete.";
        setScrapeWarning(`${message} You can continue and we will use your answers to build the report.`);
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
        <button
          type="button"
          onClick={goToLogin}
          disabled={isGoingToLogin}
          className="text-[13.5px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {isGoingToLogin ? (
            <InlineLoader label="Opening login..." />
          ) : (
            <>Already have an account? <span className="text-[#5B5CEB] font-semibold">Log in</span></>
          )}
        </button>
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
