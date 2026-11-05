import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import CanvasSection from "@/components/common/CanvasSection";
import LenisProvider from "@/components/common/LenisProvider";
import Navbar from "@/components/common/NavBar";
import { ContactProvider } from "@/components/contexts/ContactContext";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Share banner (opengraph-image.jpg / twitter-image.jpg), favicon.ico, icon.png and
// apple-icon.png sit next to this file and are picked up by Next automatically.
// Rebuild them with: node scripts/brand/build.mjs
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "marketing",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: site.locale,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Set these env vars to the tokens from Google Search Console / Bing Webmaster Tools
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

// Structured data: tells search engines who the business is, how to reach it and what it offers
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/icons/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${site.url}/opengraph-image.jpg`,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      telephone: site.phone,
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      areaServed: { "@type": "Country", name: "India" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          telephone: site.phone,
          areaServed: "IN",
          availableLanguage: ["English"],
        },
      ],
      sameAs: Object.values(site.social),
      knowsAbout: site.services.map((s) => s.name),
      makesOffer: site.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@id": `${site.url}/#organization` },
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-IN",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <script
          type="application/ld+json"
          // `<` escaped so the JSON can never close the script tag early
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <ContactProvider>
          <LenisProvider>
            <CanvasSection />
            <Navbar />
            {children}
          </LenisProvider>
        </ContactProvider>
      </body>
    </html>
  );
}
