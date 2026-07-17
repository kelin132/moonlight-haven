import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moonlight-haven.vercel.app'
const description =
  'The ultimate community platform with profiles, guilds, cards, casino games, chat, leaderboards, and more.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Moonlight Haven',
    template: '%s · Moonlight Haven',
  },
  description,
  applicationName: 'Moonlight Haven',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    siteName: 'Moonlight Haven',
    title: 'Moonlight Haven',
    description,
    url: siteUrl,
    images: [
      {
        url: '/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Moonlight Haven',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moonlight Haven',
    description,
    images: ['/og-banner.png'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1020',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
