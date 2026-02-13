import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MobileMenu } from "@/components/MobileMenu";
import { NavDropdown } from "@/components/NavDropdown";
import { Providers } from "@/components/Providers";
import CommandPalette from "@/components/CommandPalette";
import SearchTrigger from "@/components/SearchTrigger";
import { Icon } from "@/lib/icons";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://vidaencifras.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VidaEnCifras - Calculadoras Online Gratis | Herramientas de Cálculo",
    template: "%s | VidaEnCifras",
  },
  description:
    "Las cuentas que nadie te enseñó a hacer. Calculadoras gratuitas de finanzas, salud y productividad: salario neto, impuesto de renta, interés compuesto, IMC, Pomodoro y más.",
  keywords: [
    "calculadora online",
    "calculadora gratis",
    "calculadora porcentajes",
    "calculadora calorias",
    "TDEE calculadora",
    "calculadora interes compuesto",
    "calculadora prestamos",
    "calculadora cuotas",
    "calculadora IMC",
    "indice masa corporal",
    "conversor unidades",
    "calculadora fechas",
    "diferencia entre fechas",
    "calcular promedio notas",
    "dividir cuenta",
    "dias vividos",
    "herramientas calculo",
    "calculadora online gratis",
  ],
  authors: [{ name: "VidaEnCifras", url: siteUrl }],
  creator: "VidaEnCifras",
  publisher: "VidaEnCifras",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VidaEnCifras - Las cuentas que nadie te enseñó a hacer",
    description:
      "Calculadoras gratuitas de finanzas, salud y productividad: salario neto, impuesto de renta, interés compuesto, IMC, Pomodoro y más.",
    url: siteUrl,
    siteName: "VidaEnCifras",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og`,
        width: 1200,
        height: 630,
        alt: "VidaEnCifras - Calculadoras Online Gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VidaEnCifras - Las cuentas que nadie te enseñó a hacer",
    description:
      "Calculadoras gratuitas de finanzas, salud y productividad: salario neto, impuesto de renta, interés compuesto, IMC y más.",
    images: [`${siteUrl}/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VidaEnCifras",
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    description: "Calculadoras gratuitas de finanzas, salud y productividad",
    foundingDate: "2024",
    knowsAbout: [
      "Finanzas personales",
      "Cálculos laborales",
      "Salud y bienestar",
      "Productividad personal",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VidaEnCifras",
    description: "Calculadoras gratuitas de finanzas, salud y productividad",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "VidaEnCifras",
      url: siteUrl,
    },
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="hYHWKohgrr1oBRch8cS7bFpBDkF15gHhAYoGmeJQJl4" />
        <GoogleTagManager />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <GoogleTagManagerNoscript />
        <Providers>
          <ScrollToTop />
          <nav className="glass sticky top-0 z-50 border-b border-indigo-100/50 dark:border-indigo-900/50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
                aria-label="VidaEnCifras - Inicio"
              >
                <svg viewBox="0 0 64 64" className="w-8 h-8" aria-hidden="true">
                  <rect width="64" height="64" rx="14" fill="#4f46e5" />
                  <text x="32" y="44" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="32" fontWeight="800" fill="white">VC</text>
                </svg>
                <span className="text-2xl font-black tracking-tighter gradient-text-subtle">
                  VidaEnCifras
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Navegación principal">
                  <NavDropdown />
                  <Link href="/blog" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Blog
                  </Link>
                </nav>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
                <SearchTrigger />
                <ThemeToggle />
                <MobileMenu />
              </div>
            </div>
            <CommandPalette />
          </nav>
          <main className="max-w-5xl mx-auto px-6 py-12 min-h-[calc(100vh-140px)]">
            {children}
          </main>
          <footer className="glass border-t border-indigo-100/50 dark:border-indigo-900/50 mt-20">
            <div className="max-w-5xl mx-auto px-6 py-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    &copy; {new Date().getFullYear()} VidaEnCifras
                  </p>
                  <nav className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      Blog
                    </Link>
                    <Link href="/privacidad" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      Privacidad
                    </Link>
                    <Link href="/terminos" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      Términos
                    </Link>
                    <Link href="/contacto" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      Contacto
                    </Link>
                  </nav>
                </div>
                <div className="flex gap-4 text-xs font-semibold">
                  <span className="badge badge-indigo">100% Gratis</span>
                  <span className="badge badge-slate">Sin Registro</span>
                  <span className="badge badge-slate">Privado</span>
                </div>
              </div>
            </div>
          </footer>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
