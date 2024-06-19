import Footer from "@/components/footer/footer";
import Header from "@/components/global/header";
import { Toaster } from "@/components/ui/sonner";
import { esMX } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title:
    "Yesecommerce | Productos Faciales, Capilares y Dermatológicos para una Belleza Integral",
  description:
    "Descubre nuestra completa selección de productos faciales, capilares y dermatológicos de alta calidad, diseñados para realzar tu belleza natural y cuidar tu piel y cabello.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} flex min-h-screen flex-col`}>
          {/* <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          > */}
          <Header />
          {/* from p-6 to p-0 */}
          <div className="flex-1 p-0">{children}</div>
          <Footer />
          <Toaster
            toastOptions={{
              classNames: {
                error: "text-red-500",
                success: "text-emerald-500",
              },
            }}
          />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
