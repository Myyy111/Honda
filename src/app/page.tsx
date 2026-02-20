import { getCars, getSettings, getTestimonials, getPromotions } from "@/lib/store";
import HomePageClient from "@/components/home-page-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cars = await getCars();
  const settings = await getSettings();
  const testimonials = await getTestimonials();
  const promotions = await getPromotions();

  const settingsObj = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  // Limit to featured or first 8
  const featuredCars = cars.filter(c => c.isFeatured).slice(0, 8);

  return <HomePageClient featuredCars={featuredCars as any} settings={settingsObj} testimonials={testimonials as any} promotions={promotions as any} />;
}
