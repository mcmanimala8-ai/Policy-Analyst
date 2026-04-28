import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://manimalachithamanan.in'),
  title: 'Manimala Chithamanan | Policy Researcher & Analyst',
  description: 'Policy researcher and analyst in Chennai working on welfare delivery, federalism, gender justice, public data, and platform economy regulation.',
  keywords: [
    'Manimala Chithamanan',
    'policy researcher',
    'policy analyst',
    'Tamil Nadu policy',
    'fiscal federalism',
    'welfare delivery',
    'platform economy',
    'gender justice',
  ],
  authors: [{ name: 'Manimala Chithamanan' }],
  openGraph: {
    title: 'Manimala Chithamanan | Policy Researcher & Analyst',
    description: 'Research, writing, data analysis, and policy commentary on governance, federalism, welfare delivery, and public institutions.',
    url: 'https://manimalachithamanan.in',
    siteName: 'Manimala Chithamanan',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manimala Chithamanan | Policy Researcher & Analyst',
    description: 'Policy research, writing, and data-led analysis on governance and public institutions.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
