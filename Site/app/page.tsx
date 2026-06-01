import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Specs from "@/components/sections/Specs";
import SectionMarquee from "@/components/sections/SectionMarquee";
import Demo from "@/components/sections/Demo";
import Gallery from "@/components/sections/Gallery";
import VideoSection from "@/components/sections/VideoSection";
import About from "@/components/sections/About";
import Order from "@/components/sections/Order";
import Faq from "@/components/sections/Faq";
import Sav from "@/components/sections/Sav";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ChatDrawer from "@/components/chat/ChatDrawer";

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
        <VideoSection />
        <About />
        <Order />
        <Faq />
        <Sav />
      </main>
      <Footer />
      <CartDrawer />
      <ChatDrawer />
    </>
  );
}
