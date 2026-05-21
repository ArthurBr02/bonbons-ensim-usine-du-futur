import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Specs from "@/components/sections/Specs";
import SectionMarquee from "@/components/sections/SectionMarquee";
import Demo from "@/components/sections/Demo";
import Gallery from "@/components/sections/Gallery";
import About from "@/components/sections/About";
import Order from "@/components/sections/Order";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionMarquee />
        <Specs />
        <SectionMarquee />
        <Demo />
        <Gallery />
        <SectionMarquee />
        <About />
        <Order />
        <Faq />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
