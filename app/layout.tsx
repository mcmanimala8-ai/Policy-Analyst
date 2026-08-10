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
  title: 'Manimala Chithamanan | Independent Researcher — Tamil Nadu Politics, Policy & Governance',
  description: 'Independent researcher focused on Tamil Nadu politics, policy, and governance — public sector data, policy analysis, and political research.',
  keywords: [
    'Manimala Chithamanan',
    'Tamil Nadu politics',
    'Tamil Nadu governance',
    'Tamil Nadu policy analysis',
    'sub-national governance data',
    'policy performance dashboard',
    'public sector delivery',
    'political research',
  ],
  authors: [{ name: 'Manimala Chithamanan' }],
  openGraph: {
    title: 'Manimala Chithamanan | Independent Researcher — Tamil Nadu Politics, Policy & Governance',
    description: 'Policy analysis, political research, and public sector data on Tamil Nadu governance.',
    url: 'https://manimalachithamanan.in',
    siteName: 'Manimala Chithamanan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manimala Chithamanan | Independent Researcher — Tamil Nadu Politics, Policy & Governance',
    description: 'Independent research on Tamil Nadu politics, policy, and governance.',
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