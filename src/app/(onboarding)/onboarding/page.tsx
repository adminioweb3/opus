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
    updateOnboardingData,
    setState,
  } = useJourneyStore();
  const { organizationId } = useOrganizationStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeProgress, setScrapeProgress] = useState(0);

  const goNext = async () => {
    if (organizationId) {
      try {
        setIsScraping(true);
        setScrapeProgress(10);
        const formattedUrl = websiteUrl.startsWith("http")
          ? websiteUrl
          : `https://${websiteUrl}`;
        const result = await startScraping({
          organizationId: organizationId,
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
        setCurrentStep(2);
      } catch (err) {
        console.error("Failed to start scraping or scraping timed out/failed", err);
        // If scraping fails or returns no pages, proceed to the next step anyway without showing an error.
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
    country,
    targetAudience,
    products,
    keywords,
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
                disabled: !businessName,
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
          <BusinessStep data={businessData} onChange={handleBusinessChange} onSubmit={finish} />
        )}
      </OnboardingLayout>
    </>
  );
}
