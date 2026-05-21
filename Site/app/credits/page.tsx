import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

export default function CreditsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ minHeight: "80vh", paddingTop: "160px" }}>
          <div className="wrap">
            <div className="divider"><span>09</span><span>Crédits</span><span /></div>
            
            <div className="sec-head">
              <h2 className="h-display">L&apos;équipe derrière<br />le <em>projet</em>.</h2>
              <p>
                Photos, contributeurs et coulisses de la fabrication du Coco Bonbons MK1. 
                Contenu à venir.
              </p>
            </div>

            <div style={{ marginTop: 40 }}>
              <Link href="/" className="btn btn-primary">
                <span className="arrow" style={{ transform: "rotate(180deg)" }}>→</span>
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
