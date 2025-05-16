import Image from "next/image";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Stats from "./components/Stats";


export default function Home() {
  return (
    <main>
      <Nav/>
      <Hero/>
      <About/>
      <Services/>
      <Stats/>
      

    </main>
  );
}
