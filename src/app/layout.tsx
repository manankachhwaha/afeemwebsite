import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyBookBar from "@/components/layout/StickyBookBar";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import PageTransition from "@/components/motion/PageTransition";
import GoldFlash from "@/components/motion/GoldFlash";
import IntroSplash from "@/components/motion/IntroSplash";
import WindDown from "@/components/motion/WindDown";
import TimeOfDayPalette from "@/components/motion/TimeOfDayPalette";
import GoldThread from "@/components/motion/GoldThread";
import AmbientGradient from "@/components/motion/AmbientGradient";
import LiquidGold from "@/components/motion/LiquidGold";
import FilmGrain from "@/components/motion/FilmGrain";
import { BranchProvider } from "@/lib/BranchContext";
import { MOTION_INIT_SCRIPT } from "@/lib/motionPreference";
import BranchPickerModal from "@/components/branch/BranchPickerModal";
import ConciergeWidget from "@/components/concierge/ConciergeWidget";
import { site } from "@/data/site";
import { FEATURES } from "@/config/features";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the background extend under the iPhone notch/Dynamic Island and
  // home-indicator area for an edge-to-edge feel; fixed UI (StickyBookBar,
  // Ask Afeem, the concierge panel) adds env(safe-area-inset-*) padding so
  // nothing tappable ends up under those unsafe zones.
  viewportFit: "cover",
  themeColor: "#3a2818",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium Beauty, Wellness & Education in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "best salon in Jodhpur",
    "hair salon Jodhpur",
    "beauty salon Jodhpur",
    "best spa in Jodhpur",
    "bridal makeup Jodhpur",
    "beauty school Jodhpur",
    "makeup courses Jodhpur",
  ],
  openGraph: {
    title: `${site.name} — Beauty · Wellness · Education`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  sameAs: [site.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased${FEATURES.heavyMode ? " heavy-mode" : ""}`}
    >
      <body className="min-h-full flex flex-col bg-cream text-brown">
        <script dangerouslySetInnerHTML={{ __html: MOTION_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <BranchProvider>
          <SmoothScroll>
            <AmbientGradient />
            <LiquidGold />
            <FilmGrain />
            <IntroSplash />
            <WindDown />
            <TimeOfDayPalette />
            <GoldThread />
            <GoldFlash />
            <ScrollProgress />
            <Header />
            <main className="flex-1 pb-16 md:pb-0">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <StickyBookBar />
            <BranchPickerModal />
            <ConciergeWidget />
          </SmoothScroll>
        </BranchProvider>
      </body>
    </html>
  );
}
