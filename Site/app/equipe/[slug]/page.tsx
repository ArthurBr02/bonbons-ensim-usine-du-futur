import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPortfolioContent(slug: string) {
  const repo = "ArthurBr02/bonbons-ensim-usine-du-futur";
  const url = `https://raw.githubusercontent.com/${repo}/main/Portfolios/${slug}.html`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch portfolio: ${res.statusText}`);
    }

    return await res.text();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  const htmlContent = await getPortfolioContent(slug);

  if (!htmlContent) {
    notFound();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>
      {/* Top bar */}
      <header style={{ 
        height: '60px', 
        background: 'var(--glass-bg-strong)',
        backdropFilter: 'blur(12px)',
        borderBottom: '.5px solid var(--hair-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="https://github.com/ArthurBr02/bonbons-ensim-usine-du-futur/blob/main/Communication/LOGO_LITE.png?raw=true" 
            alt="Logo" 
            width={24} 
            height={24} 
          />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>Coco Bonbons</span>
        </div>
        
        <Link 
          href="/equipe" 
          className="btn-ghost"
          style={{ 
            padding: '8px 16px', 
            fontSize: '13px',
            textDecoration: 'none',
            borderRadius: '999px',
            border: '.5px solid var(--hair-2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>←</span> Revenir au site
        </Link>
      </header>

      {/* Content Iframe */}
      <iframe 
        srcDoc={htmlContent}
        title={`Portfolio de ${slug}`}
        style={{ 
          flex: 1,
          width: '100%',
          border: 'none',
          background: 'white'
        }}
      />
    </div>
  );
}
