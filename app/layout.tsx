import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import AuthWrapper from "./components/AuthWrapper";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Decoding Den",
  description: "Smarter Support. Faster Results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`} style={{ minHeight: '100vh' }}>
        <AuthProvider>
          <AuthWrapper>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1 }}>
                {children}
              </div>
              <Footer />
            </div>
          </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}