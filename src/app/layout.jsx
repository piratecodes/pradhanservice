import { Geist, Geist_Mono, Montserrat, Montserrat_Alternates } from "next/font/google";
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import "@/style/globals.css";

//Header & footer Files to add in layout.jsx
import Nav from "@/componant/nav";
import Floating from "@/componant/FloatingContact";
import Footer from "@/componant/footer";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: {
    template: "%s | Pradhan Service",
    default: "Pradhan Service",
  },
  description: "Looking for reliable packers and movers in Kolkata Pradhan Packers and Movers offers safe, affordable house shifting, office relocation & packing services.",
  canonical: "https://www.pradhanservice.com/",
  sitename: "Pradhan Services",
  keywords: ["packers and movers kolkata", "Pradhan Packers and movers"],
  openGraph: {
    url: 'https://www.pradhanservice.com',
    title: "Pradhan Services",
    type: 'website',
    siteName: "Pradhan Services",
    description: "Looking for reliable packers and movers in Kolkata Pradhan Packers and Movers offers safe, affordable house shifting, office relocation & packing services.",
    images: [
      {url: "https://www.pradhanservice.com/icon.png", alt: "pradhanservice | Logo", type: 'image/png', sizes:"192x192", fetchPriority: "auto"},
    ],
  },
  twitter:{
    card: "Pradhan Services",
    title: "Home - Pradhan Services",
    creator: "Pradhan Services",
    description: "Looking for reliable packers and movers in Kolkata Pradhan Packers and Movers offers safe, affordable house shifting, office relocation & packing services.",
    images: [
      {url: "https://www.pradhanservice.com/icon.png", alt: "pradhanservice | Logo", type: 'image/png', sizes:"192x192", fetchPriority: "auto"},
    ],
  },
  icons:{
    icon:[
      {url: '/icon.png', type: "image/png", sizes:"192x192", rel:"icon", fetchPriority: "auto"},
    ],
    shortcut: {url: '/icon.png', type: "image/png", fetchPriority: "auto"},
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
      <head>   
        {/* <!-- Google Tag Manager (noscript) --> */}
        <Script id="tag_manager_index" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MeasurementId_ga}`} />
        <Script id="tag_manager" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTMId}');`}} />

        {/* Browser Update */}
        <Script id="browser-update" dangerouslySetInnerHTML={{ __html: `var $buoop = {required:{e:-4,f:-3,o:-3,s:-1,c:-3},insecure:true,api:2025.06 }; function $buo_f(){ var e = document.createElement("script"); e.src = "https://browser-update.org/update.min.js"; document.body.appendChild(e); }; try {document.addEventListener("DOMContentLoaded", $buo_f,false)} catch(e){window.attachEvent("onload", $buo_f)}` }} />
      </head>
      <body className={`${montserrat.variable} antialiased overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-yellow-700 scrollbar-corner-yellow-800 scrollbar-track-blue-900`}>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe loading="lazy" src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTMId}`} className='hidden invisible' height="0" width="0"></iframe></noscript>

        {/* Google Analitics */}
        <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MeasurementId_ga}`} />

        <NextTopLoader   color="#c5a059"   initialPosition={0.08}   crawlSpeed={200}   height={3}   crawl={true}   showSpinner={false}   easing="ease"   speed={200}   shadow="0 0 10px #f1a4c7,0 0 5px #f1a4c7" />
        <Nav />
        {children}
        <Toaster position="top-right" />
        <Floating />
        <Footer />
      </body>
    </html>
  );
}
