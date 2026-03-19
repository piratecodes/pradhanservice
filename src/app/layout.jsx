import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import "@/style/globals.css";

//Header & footer Files to add in layout.jsx
import Nav from "@/componant/nav";
import Footer from "@/componant/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Pradhan Service",
    default: "Pradhan Service",
  },
  description: "A modern twist on a beloved classic. Our Chocolate Hazelnut Baklava features layers of crispy phyllo, a fragrant blend of cinnamon and walnuts, all enveloped",
  canonical: "https://staging.pradhanservice.com/",
  sitename: "Yia Yia's Baklava",
  openGraph: {
    url: 'https://staging.pradhanservice.com',
    title: "Yia Yia's Baklava",
    type: 'website',
    siteName: "Yia Yia's Baklava",
    description: 'A modern twist on a beloved classic. Our Chocolate Hazelnut Baklava features layers of crispy phyllo, a fragrant blend of cinnamon and walnuts, all enveloped',
    images: [
      {url: "https://staging.pradhanservice.com/32x32.webp", alt: "pradhanservice | Logo", type: 'image/webp', sizes:"32x32", fetchPriority: "auto"},
      {url: "https://staging.pradhanservice.com/192x192.webp", alt: "pradhanservice | Logo", type: 'image/webp', sizes:"192x192", fetchPriority: "auto"}
    ],
  },
  twitter:{
    card: "Yia Yia's Baklava",
    title: "Home - Yia Yia's Baklava",
    creator: "Yia Yia's Baklava",
    description: 'A modern twist on a beloved classic. Our Chocolate Hazelnut Baklava features layers of crispy phyllo, a fragrant blend of cinnamon and walnuts, all enveloped',
    images: [
      {url: "https://staging.pradhanservice.com/32x32.webp", alt: "pradhanservice | Logo", type: 'image/webp', sizes:"32x32", fetchPriority: "auto"},
      {url: "https://staging.pradhanservice.com/192x192.webp", alt: "pradhanservice | Logo", type: 'image/webp', sizes:"192x192", fetchPriority: "auto"}
    ],
  },
  icons:{
    icon:[
      {url: '/32x32.webp', type: "image/webp", sizes:"32x32", rel:"icon", fetchPriority: "auto"},
      {url: '/192x192.webp', type: "image/webp", sizes:"192x192", rel:"icon", fetchPriority: "auto"},
    ],
    shortcut: {url: '/192x192.webp', type: "image/webp", fetchPriority: "auto"},
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-yellow-700 scrollbar-corner-yellow-800 scrollbar-track-blue-900`}>
        <NextTopLoader   color="#c5a059"   initialPosition={0.08}   crawlSpeed={200}   height={3}   crawl={true}   showSpinner={false}   easing="ease"   speed={200}   shadow="0 0 10px #f1a4c7,0 0 5px #f1a4c7" />
        <Nav />
        {children}
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
