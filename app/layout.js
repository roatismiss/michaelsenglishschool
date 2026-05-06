import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Michael's English School - English Conversation School in Osaka",
  description: "Michael's English School offers native-speaker English lessons in Tennoji and Furuichi, Osaka. General, Business, Kids, IELTS, Cambridge, and EIKEN courses available. Trial lesson welcome!",
  keywords: "English school Osaka, English conversation Osaka, eikaiwa Osaka, IELTS Osaka, business English Osaka, kids English Osaka, Tennoji English school, native speaker English teacher",
  icons: {
    icon: "/MES-Bear.png",
    apple: "/MES-Bear.png",
  },
  openGraph: {
    title: "Michael's English School - English Conversation School in Osaka",
    description: "Native-speaker English lessons in Tennoji and Furuichi, Osaka. General, Business, Kids, IELTS, Cambridge & EIKEN courses. Trial lesson welcome!",
    url: "https://michaelsenglishschool.com",
    siteName: "Michael's English School",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'DM Sans', 'Noto Sans JP', sans-serif" }}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}