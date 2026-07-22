import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/components/home/HeroSection";
import ProductPreview from "@/components/home/ProductPreview";
import WorkflowSection from "@/components/home/WorkflowSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <PublicNavbar />

      <main>
        <HeroSection />
        <ProductPreview />
        <WorkflowSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <Footer />

    </div>
  );
}
