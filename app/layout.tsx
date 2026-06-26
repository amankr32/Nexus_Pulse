import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/layout/PageLoader";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://nexus-pulse.example.com";
const SITE_NAME = "Nexus Pulse";
const SITE_DESCRIPTION =
  "Nexus Pulse turns scattered data sources into governed, AI-orchestrated pipelines — ingest, transform, and ship trustworthy data in days, not quarters.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI-Native Data Automation Platform`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "data automation platform",
    "AI data pipeline",
    "data orchestration",
    "ETL automation",
    "data governance software",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI-Native Data Automation Platform`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Nexus Pulse — AI-native data automation platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI-Native Data Automation Platform`,
    description: SITE_DESCRIPTION,
    images: ["/og-cover.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0d0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--color-bg) text-(--color-ink)">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
