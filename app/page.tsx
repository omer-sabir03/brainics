import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import About from "@/components/About";
import Results from "@/components/Results";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import KeepAlive from "@/components/KeepAlive";

export default function Home() {
  return (
    <>
      <KeepAlive />
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <About />
        <Results />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
