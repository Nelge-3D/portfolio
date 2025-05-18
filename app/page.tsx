
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Cursor from "@/components/Cursor";



export default function Home() {
  return (
    <main>
      <Cursor/>
      <Nav/>
      <Hero/>
      <About/>
      <Services/>
      <Testimonials/>
      <Stats/>
      
      

    </main>
  );
}
