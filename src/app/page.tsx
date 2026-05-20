import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <ProductsShowcase />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
