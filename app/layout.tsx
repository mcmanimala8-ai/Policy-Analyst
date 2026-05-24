import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
})


export const metadata: Metadata = {
  metadataBase: new URL('https://manimalachithamanan.in'),
  title: 'Manimala Chithamanan | Tamil Nadu Governance Data & Political Risk Strategy',
  description: 'Independent Tamil Nadu governance desk focused on sub-national public sector data, operational frameworks, technical policy briefs, and political risk strategy.',
  keywords: [
    'Manimala Chithamanan',
    'Tamil Nadu governance',
    'sub-national governance data',
    'political risk strategy',
    'policy performance dashboard',
    'operational blueprints',
    'public sector delivery',
    'Tamil Nadu policy analysis',
  ],
  authors: [{ name: 'Manimala Chithamanan' }],
  openGraph: {
    title: 'Manimala Chithamanan | Tamil Nadu Governance Data & Political Risk Strategy',
    description: 'Technical policy briefs, operational frameworks, and strategic data analysis on Tamil Nadu public sector delivery.',
    url: 'https://manimalachithamanan.in',
    siteName: 'Manimala Chithamanan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manimala Chithamanan | Tamil Nadu Governance Data & Political Risk Strategy',
    description: 'Sub-national governance data, operational frameworks, and political risk strategy for Tamil Nadu.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}