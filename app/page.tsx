"use client";

import { useEffect } from "react";
import { onceRevealSection } from "@/lib/onceReveal";
import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import DashboardMock from "@/components/DashboardMock";
import FeaturesGrid from "@/components/FeaturesGrid";
import AssistantSection from "@/components/AssistantSection";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";

export default function Page() {
  useEffect(() => {
    onceRevealSection("#caracteristicas");
  }, []);

  return (
    <>
      <TopNav />
      <Hero />
      <DashboardMock />
      <FeaturesGrid />
      <AssistantSection />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}

