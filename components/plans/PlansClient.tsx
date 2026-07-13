"use client";

import { useState } from "react";
import { PlanId } from "@/lib/data";
import PlanExplorer from "@/components/plans/PlanExplorer";
import PlanQuiz from "@/components/plans/PlanQuiz";
import PlanMatrix from "@/components/plans/PlanMatrix";

/** Plans chapter: explorer panels + matchmaker quiz + full comparison matrix. */
export default function PlansClient() {
  const [recommended, setRecommended] = useState<PlanId | null>(null);

  const handleResult = (plan: PlanId) => {
    setRecommended(plan);
    // pulse the explorer into view with its "recommended" ribbon
    document.getElementById("plan-explorer")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div data-chapter className="bg-paper pb-20 text-ink md:pb-28">
        <PlanExplorer recommended={recommended} />
      </div>
      <PlanQuiz onResult={handleResult} />
      <PlanMatrix />
    </>
  );
}
