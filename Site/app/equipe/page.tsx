import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ChatDrawer from '@/components/chat/ChatDrawer';

interface GitHubContent {
  name: string;
  path: string;
  download_url: string;
  type: string;
}

async function getMembers() {
  const repo = "ArthurBr02/bonbons-ensim-usine-du-futur";
  const path = "Portfolios";
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Inject token if you have one in env for higher rate limits
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
      }
    });

    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`Failed to fetch members: ${res.statusText}`);
    }

    const data: GitHubContent[] = await res.json();
    
    return data
      .filter(file => file.name.endsWith('.html'))
      .map(file => {
        const slug = file.name.replace('.html', '');
        const name = slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        return { slug, name };
      });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function EquipePage() {
  const members = await getMembers();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '120px' }}>
        <section className="wrap">
          <div className="sec-head">
            <div>
              <span className="h-eyebrow">L'Équipe</span>
              <h1 className="h-display" style={{ fontSize: 'clamp(42px, 6vw, 84px)', marginTop: '16px' }}>
                Portfolios <em>Créatifs</em>
              </h1>
            </div>
            <p>
              Découvrez les portfolios personnels des membres de l'équipe ayant participé à la conception de Coco Bonbons.
            </p>
          </div>

          {members.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '24px',
              marginTop: '48px' 
            }}>
              {members.map(member => (
                <Link 
                  key={member.slug} 
                  href={`/equipe/${member.slug}`}
                  className="about-card"
                  style={{ 
                    display: 'block', 
                    transition: 'transform 200ms ease, border-color 200ms ease',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    background: 'var(--accent)', 
                    color: 'var(--accent-ink)',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    marginBottom: '20px'
                  }}>
                    {member.name.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>{member.name}</h3>
                  <p style={{ fontSize: '14px', opacity: 0.8 }}>Voir le portfolio →</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="about-card" style={{ textAlign: 'center', padding: '64px 24px' }}>
              <p className="muted">Aucun portfolio n'est disponible pour le moment.</p>
              <p style={{ marginTop: '16px', fontSize: '14px' }}>
                Les membres de l'équipe peuvent ajouter leur portfolio dans le dossier <code>Portfolios/</code> du dépôt GitHub.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <CartDrawer />
      <ChatDrawer />
    </>
  );
}
