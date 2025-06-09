

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import { Badge } from "@/components/ui/badge";




export default function Home() {
  return (
    <main>
      
      <About/>
      <Services/>
      <Testimonials/>
      <Stats/>
      <Badge/>
      

    </main>
  );
}
