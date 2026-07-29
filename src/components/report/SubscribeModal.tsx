"use client"

import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOrganizationStore } from "@/lib/stores/organizationStore"

/**
 * Deliberately NOT a real Dialog — Base UI's Dialog always portals a `fixed inset-0` backdrop
 * across the whole viewport, which would dim the report's free-preview section (cover/KPIs/
 * executive summary) above this along with the gated sections below it. This renders as a plain
 * absolutely-positioned overlay scoped to whatever `relative`-positioned parent wraps it — so only
 * the gated section dims/blurs, and the preview above stays fully visible and sharp.
 */
export default function SubscribeModal({ organizationId }: { organizationId: string }) {
  const router = useRouter()

  const handleSubscribe = () => {
    useOrganizationStore.getState().setOrganizationId(organizationId)
    router.push("/dashboard/geo-dashboard")
  }

  return (
    <div className="absolute inset-0 z-10 flex items-start justify-center pt-32 pb-16">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 text-center max-w-md mx-auto sticky top-32">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Unlock Full Insights</h3>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Subscribe to access deep competitor intelligence, AI prompt analysis, regional dominance, and your complete action plan.
        </p>
        <Button
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSubscribe}
        >
          Subscribe Now
        </Button>
      </div>
    </div>
  )
}
