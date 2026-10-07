import type { Metadata } from "next";
import { Geist_Mono, Manrope, Open_Sans } from "next/font/google";
import "./globals.css";

/** Display / títulos — variables en app/globals.css (--font-manrope). */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

/** Cuerpo: Open Sans; peso base en --font-weight-body (globals.css). 300/600/700 para light/semibold/bold. */
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Lizeth Avendaño";
const SITE_DESCRIPTION =
  "Senior Product Designer based in Colombia. I translate complex business challenges into intuitive, high-converting B2B and B2C experiences — UX research, design systems and AI-assisted product design.";

/** URL pública: Vercel la expone en producción; en local usa localhost. */
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Senior Product Designer`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: "https://www.linkedin.com/in/lizethnohelia/" }],
  keywords: [
    "Product Designer",
    "UX/UI Designer",
    "Design Systems",
    "UX Research",
    "B2B SaaS",
    "Fintech",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Senior Product Designer`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lizeth Avendaño — Senior Product Designer · UX/UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Senior Product Designer`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${openSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
