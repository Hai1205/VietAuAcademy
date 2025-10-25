import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Slide, ToastContainer } from "react-toastify";
import LinkProgressProvider from "@/components/layout/navigation/LinkProgressBar";
import { ThemeProvider } from "@/components/layout/theme/ThemeProvider";
import Navbar from "@/components/layout/navigation/Navbar";
import Footer from "@/components/layout/footer/Footer";
import FloatingContactButtons from "@/components/layout/contact/FloatingContactButtons";
import { COMPANY, DESCRIPTION } from "@/utils/services/constants";

// Optimize font loading with display swap
const inter = Inter({
  subsets: ["vietnamese"],
  display: "swap",
  preload: true,
});

// Enhanced metadata with performance hints
export const metadata: Metadata = {
  title: `${COMPANY} - ${DESCRIPTION}`,
  description:
    "Kết nối giáo dục & nâng tầm cuộc sống. Chương trình du học chất lượng cao tại Hàn Quốc, Nhật Bản, Đài Loan, Đức, Mỹ, Úc.",
  keywords: "du học, giáo dục quốc tế, Hàn Quốc, Nhật Bản, Đài Loan, học bổng",
  authors: [{ name: `${COMPANY} Team` }],
  metadataBase: new URL("https://thuytung.com"),
  icons: {
    icon: "/images/logo1.png",
    shortcut: "/images/logo1.png",
    apple: "/images/logo1.png",
  },
  openGraph: {
    title: `${COMPANY} - ${DESCRIPTION}`,
    description: "Kết nối giáo dục & nâng tầm cuộc sống",
    url: "https://thuytung.com",
    siteName: `${COMPANY}`,
    locale: "vi_VN",
    type: "website",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://zalo.me" />
        {/* Preload critical images */}
        <link
          rel="preload"
          href="/images/logo1.png"
          as="image"
          type="image/png"
        />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <LinkProgressProvider>
          <ThemeProvider>
            {/* Critical above-fold content - SSR */}
            <Navbar />

            <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
              {children}
            </main>

            {/* Footer - can be SSR since it's below fold */}
            <Footer />

            {/* Floating contact buttons */}
            <FloatingContactButtons />

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
            />
          </ThemeProvider>
        </LinkProgressProvider>
      </body>
    </html>
  );
}
